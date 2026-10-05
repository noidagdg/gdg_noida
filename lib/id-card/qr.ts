/**
 * Pure TypeScript self-contained QR Code SVG generator.
 * Supports Byte Mode, standard finder/timing/alignment patterns, and Reed-Solomon error correction.
 * Requires zero external dependencies.
 */

// Galois Field GF(256) tables for QR Reed-Solomon error correction
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_EXP[i + 255] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF_EXP[GF_LOG[x] + GF_LOG[y]];
}

function rsPolyMul(p1: Uint8Array, p2: Uint8Array): Uint8Array {
  const r = new Uint8Array(p1.length + p2.length - 1);
  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      r[i + j] ^= gfMul(p1[i], p2[j]);
    }
  }
  return r;
}

function rsGenPoly(n: number): Uint8Array {
  let poly: any = new Uint8Array([1]);
  for (let i = 0; i < n; i++) {
    poly = rsPolyMul(poly, new Uint8Array([1, GF_EXP[i]]));
  }
  return poly as Uint8Array;
}

function rsRemainder(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = rsGenPoly(ecCount);
  const out = new Uint8Array(ecCount);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ out[0];
    for (let j = 0; j < ecCount - 1; j++) {
      out[j] = out[j + 1] ^ gfMul(gen[j + 1], factor);
    }
    out[ecCount - 1] = gfMul(gen[ecCount], factor);
  }
  return out;
}

// Table of QR versions: total capacity, EC words per block, etc. (Level M/Q)
type VersionSpec = { version: number; size: number; totalData: number; ecPerBlock: number; blocks: number; align: number[] };

const VERSIONS: VersionSpec[] = [
  { version: 1, size: 21, totalData: 16, ecPerBlock: 10, blocks: 1, align: [] },
  { version: 2, size: 25, totalData: 28, ecPerBlock: 16, blocks: 1, align: [6, 18] },
  { version: 3, size: 29, totalData: 44, ecPerBlock: 26, blocks: 1, align: [6, 22] },
  { version: 4, size: 33, totalData: 64, ecPerBlock: 18, blocks: 2, align: [6, 26] },
  { version: 5, size: 37, totalData: 86, ecPerBlock: 24, blocks: 2, align: [6, 30] },
  { version: 6, size: 41, totalData: 108, ecPerBlock: 16, blocks: 4, align: [6, 34] },
  { version: 7, size: 45, totalData: 124, ecPerBlock: 18, blocks: 4, align: [6, 22, 38] },
  { version: 8, size: 49, totalData: 154, ecPerBlock: 22, blocks: 4, align: [6, 24, 42] },
  { version: 9, size: 53, totalData: 182, ecPerBlock: 22, blocks: 5, align: [6, 26, 46] },
  { version: 10, size: 57, totalData: 216, ecPerBlock: 26, blocks: 5, align: [6, 28, 50] },
];

function selectVersion(dataLength: number): VersionSpec {
  for (const v of VERSIONS) {
    // Mode indicator (4 bits) + length indicator (8 or 16 bits) + data bytes
    const charCountBits = v.version < 10 ? 8 : 16;
    const requiredBits = 4 + charCountBits + dataLength * 8;
    const requiredBytes = Math.ceil(requiredBits / 8);
    if (requiredBytes <= v.totalData) {
      return v;
    }
  }
  return VERSIONS[VERSIONS.length - 1];
}

function encodeData(text: string, spec: VersionSpec): Uint8Array {
  const utf8 = new TextEncoder().encode(text);
  const bitBuf: number[] = [];

  function pushBits(val: number, len: number) {
    for (let i = len - 1; i >= 0; i--) {
      bitBuf.push((val >>> i) & 1);
    }
  }

  // Byte mode indicator: 0100
  pushBits(0b0100, 4);
  const countBits = spec.version < 10 ? 8 : 16;
  pushBits(utf8.length, countBits);

  for (const byte of utf8) {
    pushBits(byte, 8);
  }

  // Terminator (up to 4 zeroes)
  const maxBits = spec.totalData * 8;
  const termLen = Math.min(4, maxBits - bitBuf.length);
  pushBits(0, termLen);

  // Pad to byte boundary
  while (bitBuf.length % 8 !== 0) {
    bitBuf.push(0);
  }

  // Pad bytes: alternating 0xEC, 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bitBuf.length < maxBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const out = new Uint8Array(spec.totalData);
  for (let i = 0; i < spec.totalData; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | bitBuf[i * 8 + b];
    }
    out[i] = byte;
  }
  return out;
}

export function generateQrMatrix(text: string): { matrix: boolean[][]; size: number } {
  const spec = selectVersion(new TextEncoder().encode(text).length);
  const data = encodeData(text, spec);

  // Split into blocks and compute EC
  const dataPerBlock = Math.floor(spec.totalData / spec.blocks);
  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];

  for (let b = 0; b < spec.blocks; b++) {
    const start = b * dataPerBlock;
    const end = b === spec.blocks - 1 ? spec.totalData : start + dataPerBlock;
    const blockData = data.slice(start, end);
    dataBlocks.push(blockData);
    ecBlocks.push(rsRemainder(blockData, spec.ecPerBlock));
  }

  // Interleave data and EC bytes
  const interleaved: number[] = [];
  const maxBlockLen = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxBlockLen; i++) {
    for (const b of dataBlocks) {
      if (i < b.length) interleaved.push(b[i]);
    }
  }
  for (let i = 0; i < spec.ecPerBlock; i++) {
    for (const b of ecBlocks) {
      if (i < b.length) interleaved.push(b[i]);
    }
  }

  // Build module grid
  const n = spec.size;
  const grid: (boolean | null)[][] = Array.from({ length: n }, () => Array(n).fill(null));
  const isFunction: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  function setFunc(r: number, c: number, val: boolean) {
    if (r >= 0 && r < n && c >= 0 && c < n) {
      grid[r][c] = val;
      isFunction[r][c] = true;
    }
  }

  // Finder patterns (7x7) + separator
  function placeFinder(r0: number, c0: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const row = r0 + r;
        const col = c0 + c;
        if (row < 0 || row >= n || col < 0 || col >= n) continue;
        const isBorder = r === -1 || r === 7 || c === -1 || c === 7;
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        setFunc(row, col, isBorder ? false : isOuter || isInner);
      }
    }
  }

  placeFinder(0, 0);
  placeFinder(0, n - 7);
  placeFinder(n - 7, 0);

  // Timing patterns
  for (let i = 8; i < n - 8; i++) {
    setFunc(6, i, i % 2 === 0);
    setFunc(i, 6, i % 2 === 0);
  }

  // Alignment patterns
  const aligns = spec.align;
  for (let i = 0; i < aligns.length; i++) {
    for (let j = 0; j < aligns.length; j++) {
      const r = aligns[i];
      const c = aligns[j];
      // Skip if overlapping finder patterns
      if ((r <= 8 && c <= 8) || (r <= 8 && c >= n - 8) || (r >= n - 8 && c <= 8)) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const isEdge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
          const isCenter = dr === 0 && dc === 0;
          setFunc(r + dr, c + dc, isEdge || isCenter);
        }
      }
    }
  }

  // Dark module
  setFunc(4 * spec.version + 9, 8, true);

  // Reserve format info area
  for (let i = 0; i < 9; i++) {
    if (grid[8][i] === null) setFunc(8, i, false);
    if (grid[i][8] === null) setFunc(i, 8, false);
  }
  for (let i = n - 8; i < n; i++) {
    if (grid[8][i] === null) setFunc(8, i, false);
    if (grid[i][8] === null) setFunc(i, 8, false);
  }

  // Place data bits in zigzag upward/downward columns
  const allBits: number[] = [];
  for (const byte of interleaved) {
    for (let b = 7; b >= 0; b--) {
      allBits.push((byte >>> b) & 1);
    }
  }

  let bitIdx = 0;
  let upward = true;
  for (let c = n - 1; c > 0; c -= 2) {
    if (c === 6) c--; // Skip vertical timing column
    const rows = upward ? Array.from({ length: n }, (_, i) => n - 1 - i) : Array.from({ length: n }, (_, i) => i);
    for (const r of rows) {
      for (const col of [c, c - 1]) {
        if (!isFunction[r][col]) {
          const bit = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
          // Apply mask 0: (r + col) % 2 === 0
          const mask = (r + col) % 2 === 0;
          grid[r][col] = (bit === 1) !== mask;
        }
      }
    }
    upward = !upward;
  }

  // Format string for Error Correction M (00) + Mask 0 (000) => 0b101010000010010
  const formatStr = 0b101010000010010;
  for (let i = 0; i < 15; i++) {
    const bit = ((formatStr >>> (14 - i)) & 1) === 1;
    if (i < 6) setFunc(8, i, bit);
    else if (i === 6) setFunc(8, 7, bit);
    else if (i <= 8) setFunc(8, 8 - (i - 7), bit);
    else setFunc(14 - i, 8, bit);

    // Mirror on edges
    if (i < 8) setFunc(n - 1 - i, 8, bit);
    else setFunc(8, n - 15 + i, bit);
  }

  const finalMatrix: boolean[][] = grid.map((row) => row.map((cell) => cell === true));
  return { matrix: finalMatrix, size: n };
}

export function qrSvgString(url: string, margin = 4): string {
  const { matrix, size } = generateQrMatrix(url);
  const totalSize = size + margin * 2;
  let paths = "";

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        paths += `M${c + margin} ${r + margin}h1v1h-1z `;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" shape-rendering="crispEdges">
  <rect width="${totalSize}" height="${totalSize}" fill="#ffffff"/>
  <path d="${paths.trim()}" fill="#000000"/>
</svg>`;
}

export function qrDataUrl(url: string, margin = 4): string {
  const svg = qrSvgString(url, margin);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
