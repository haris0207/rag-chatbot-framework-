// lib/retriever.ts
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Index } from "@upstash/vector";
import type { Chunk } from '../training/ingest';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embedModel = genAI.getGenerativeModel({ model: "embedding-001" });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Generate embeddings
async function embedText(text: string): Promise<number[]> {
  const result = await embedModel.embedContent(text);
  return result.embedding.values;
}

// Upstash doesn’t allow full delete in free tier
export async function resetCollection(industryName: string) {
  console.log(`(Upstash) Reset not supported. Using upsert to overwrite docs for: ${industryName}`);
}

// Add documents
export async function addDocuments(chunks: Chunk[]) {
  const vectors = await Promise.all(
    chunks.map(async (chunk) => ({
      id: chunk.id,
      vector: await embedText(chunk.text),
      metadata: {
        text: chunk.text,           // ✅ include the actual chunk text
        industry: chunk.metadata?.industry,
        source: chunk.metadata?.source,
        chunk_index: chunk.metadata?.chunk_index,
      },
    }))
  );

  // Upsert vectors to Upstash (no 'collection' property)
  await index.upsert(vectors);

  console.log(`✅ Added ${vectors.length} vectors with metadata.text.`);
}

// Query documents
export async function queryDocuments(
  industryName: string,
  query: string,
  k = 3
): Promise<string[]> {
  const embedding = await embedText(query);

  const results = await index.query({
    vector: embedding,
    topK: k,
    filter: `industry = "portfolio"`, // ✅ FIXED: object filter
    includeMetadata: true,
  });
  console.log("🔎 Upstash results:", JSON.stringify(results, null, 2));

  // ✅ Map results to stored text
  return results.map((r) => String(r.metadata?.text || ""));
}