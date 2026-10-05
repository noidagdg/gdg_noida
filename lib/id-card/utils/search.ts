export function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export function searchTokens(query: string | undefined): string[] {
  if (!query) return [];
  return query
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .slice(0, 5);
}
