import { formatBotReply } from "./formatter";
import { queryDocuments } from "./retriever";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function ragPipeline(
  industryName: string,
  query: string,
  history: { role: string; content: string }[],
  k = 3
) {
  // Step 1: retrieve relevant docs
  const docs = await queryDocuments(industryName, query, k);

  // Step 2: build conversation history
  const conversationHistory = history
    .map((msg) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.content}`)
    .join("\n");

  // Step 3: build context from docs
  const context = docs
    .map((d: any) => (typeof d === "string" ? d : d.metadata?.text ?? ""))
    .join("\n");

  if (!context.trim()) {
    return "That detail is not in Haris's resume.";
  }

  // Step 4: augmented prompt
  const prompt = `
You are Haris Khan's professional AI assistant. Your role is to answer questions about Haris Khan's resume, skills, projects, and experience.

**Instructions:**
- Use ONLY the provided context. If information is not available, respond briefly: "That detail is not in Haris's resume."
- Always answer in a **professional tone**.
- Use **markdown formatting** with short sentences and bullet points for lists.
- Keep answers **concise and direct** (no filler like "I apologize").
- Never invent details beyond the context.

Conversation History:
${conversationHistory}

Context:
${context}

Question: ${query}
Answer:
`;

  // Step 5: get LLM response
  const result = await model.generateContent(prompt);
  const rawReply = result.response.text();

  return rawReply;
}
