const BATCH_SIZE = 100;
const MAX_RETRIES = 3;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required for embeddings");
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        const response = await client.embeddings.create({
          model: "text-embedding-3-small",
          input: batch,
        });
        allEmbeddings.push(...response.data.map((d) => d.embedding));
        break;
      } catch (err) {
        attempt++;
        if (attempt >= MAX_RETRIES) throw err;
        await sleep(Math.pow(2, attempt) * 500);
      }
    }
  }

  return allEmbeddings;
}

export async function embedSingle(text: string): Promise<number[]> {
  const results = await embedBatch([text]);
  return results[0];
}
