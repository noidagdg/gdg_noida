import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const dataDirectory = path.join(projectRoot, "lib", "data", "gdg-noida-events");
const outputDirectory = path.join(projectRoot, "public", "assets", "event-covers");

function coverImageHash(value) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

async function getTypeScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? getTypeScriptFiles(entryPath)
      : entry.name.endsWith(".ts") ? [entryPath] : [];
  }));

  return nestedFiles.flat();
}

const files = await getTypeScriptFiles(dataDirectory);
const sourceUrls = new Set();

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(/["']?coverImage["']?\s*:\s*["'](https?:\/\/[^"']+)["']/g)) {
    sourceUrls.add(match[1]);
  }
}

await mkdir(outputDirectory, { recursive: true });
const urls = [...sourceUrls];

for (let index = 0; index < urls.length; index += 1) {
  const url = urls[index];
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not download event cover (${response.status}): ${url}`);
  }

  const destination = path.join(outputDirectory, `${coverImageHash(url)}.webp`);
  await sharp(Buffer.from(await response.arrayBuffer()))
    .rotate()
    .resize({ width: 960, height: 540, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 60, effort: 5 })
    .toFile(destination);

  console.log(`${index + 1}/${urls.length} ${path.basename(destination)}`);
}
