export interface Chunk {
  content: string;
  tokenCount: number;
  pageNumber?: number;
}

// Approximation: 1 token ≈ 4 characters (avoids heavy tiktoken dependency on Vercel)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function chunkText(
  text: string,
  opts: { maxTokens?: number; overlap?: number } = {}
): Chunk[] {
  const maxTokens = opts.maxTokens ?? 500;
  const overlapTokens = opts.overlap ?? 50;

  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const chunks: Chunk[] = [];
  let current = "";
  let currentTokens = 0;

  for (const para of paragraphs) {
    const paraTokens = estimateTokens(para);

    if (paraTokens > maxTokens) {
      // Para muito longo: quebra por sentença
      if (current) {
        chunks.push({ content: current.trim(), tokenCount: currentTokens });
        // overlap: pega as últimas palavras
        const words = current.split(" ");
        const overlapWords = words.slice(-Math.ceil(overlapTokens * 4 / 5));
        current = overlapWords.join(" ");
        currentTokens = estimateTokens(current);
      }
      const sentences = para.split(/(?<=[.!?])\s+/);
      for (const sentence of sentences) {
        const sentTokens = estimateTokens(sentence);
        if (currentTokens + sentTokens > maxTokens) {
          if (current) {
            chunks.push({ content: current.trim(), tokenCount: currentTokens });
            const words = current.split(" ");
            const overlapWords = words.slice(-Math.ceil(overlapTokens * 4 / 5));
            current = overlapWords.join(" ");
            currentTokens = estimateTokens(current);
          }
        }
        current = current ? `${current} ${sentence}` : sentence;
        currentTokens = estimateTokens(current);
      }
    } else if (currentTokens + paraTokens > maxTokens) {
      if (current) {
        chunks.push({ content: current.trim(), tokenCount: currentTokens });
        const words = current.split(" ");
        const overlapWords = words.slice(-Math.ceil(overlapTokens * 4 / 5));
        current = overlapWords.join(" ");
        currentTokens = estimateTokens(current);
      }
      current = current ? `${current}\n\n${para}` : para;
      currentTokens = estimateTokens(current);
    } else {
      current = current ? `${current}\n\n${para}` : para;
      currentTokens += paraTokens;
    }
  }

  if (current.trim()) {
    chunks.push({ content: current.trim(), tokenCount: currentTokens });
  }

  return chunks.filter((c) => c.content.length > 20);
}
