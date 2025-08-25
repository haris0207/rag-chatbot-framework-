// scripts/testRetriever.js
import { addDocuments, queryDocuments } from "../lib/retriever";

async function run() {
  await addDocuments([
    { id: "1", text: "Haris is building an open-source chatbot." },
    { id: "2", text: "Chroma is a vector database used for embeddings." },
    { id: "3", text: "Gemini is a generativ    npm install --save-dev ts-node@latest typescript@lateste AI model by Google." },
  ]);

  const results = await queryDocuments("What is Chroma?");
  console.log("Query results:", results);
}

run();
