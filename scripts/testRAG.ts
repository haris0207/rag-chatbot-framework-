// scripts/testRAG.ts

import "dotenv/config";
// import { addDocuments, resetCollection } from "../lib/retriever"; // Comment out or remove these imports if you're testing against pre-ingested data
import { ragPipeline } from "../lib/pipeline";

async function main() {
  // ✅ IMPORTANT: Comment out or remove resetCollection and addDocuments
  //    when testing against data already ingested by training/ingest.ts
  // await resetCollection("customer_support"); 
  // await addDocuments("customer_support", [
  //   { id: "1", text: "The Eiffel Tower is in Paris." },
  //   { id: "2", text: "The Great Wall is in China." },
  //   { id: "3", text: "The Statue of Liberty is in New York." },
  // ]);

  // ✅ Now, query based on the content of your refund_policy.pdf
  const query1 = "What is the refund policy?";
  const answer1 = await ragPipeline("customer_support", query1, []); // Pass an empty array for history for this test
  console.log("Q:", query1);
  console.log("A:", answer1);
  console.log("---");

  const query2 = "How do I return an item?";
  const answer2 = await ragPipeline("customer_support", query2, []);
  console.log("Q:", query2);
  console.log("A:", answer2);
  console.log("---");
}

main().catch(err => console.error(err));
