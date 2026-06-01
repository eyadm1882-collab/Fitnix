export function chunkText(text: string, maxChunkSize = 1000): string[] {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    if ((currentChunk + "\n\n" + trimmed).length > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk = currentChunk ? currentChunk + "\n\n" + trimmed : trimmed;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function extractKeywords(text: string): string[] {
  const arabicStopWords = new Set([
    "في", "من", "إلى", "عن", "على", "كان", "هذا", "هذه", "ذلك", "تلك",
    "مع", "قد", "لا", "ما", "لم", "لن", "إن", "أن", "إذا", "لو",
    "كانت", "كانوا", "يكون", "تكون", "يكونون", "لكن", "لذلك", "ثم",
    "أو", "و", "ف", "ب", "ل", "ك", "التي", "الذي", "الذين", "ال",
  ]);

  const words = text
    .replace(/[^\w\s\u0600-\u06FF]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !arabicStopWords.has(w));

  return [...new Set(words)];
}

export function calculateRelevance(query: string, chunk: string): number {
  const queryWords = extractKeywords(query.toLowerCase());
  const chunkText = chunk.toLowerCase();
  let score = 0;

  for (const word of queryWords) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const matches = chunkText.match(regex);
    if (matches) {
      score += matches.length;
    }
  }

  return score;
}

export function searchChunks(
  query: string,
  chunks: { content: string; documentTitle: string }[],
  topK = 5
): { content: string; documentTitle: string; score: number }[] {
  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: calculateRelevance(query, chunk.content),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((c) => c.score > 0);
}
