// lib/memory.ts
type Message = { role: "user" | "bot"; content: string };

const memoryStore: Record<string, Message[]> = {};

export function addMessage(sessionId: string, role: "user" | "bot", content: string) {
  if (!memoryStore[sessionId]) {
    memoryStore[sessionId] = [];
  }
  memoryStore[sessionId].push({ role, content });

  // Keep only last 10 messages
  if (memoryStore[sessionId].length > 10) {
    memoryStore[sessionId] = memoryStore[sessionId].slice(-10);
  }

  // 🛠 Debug log
  console.log("🧠 Memory for session:", sessionId, memoryStore[sessionId]);
}

export function getMessages(sessionId: string): Message[] {
  return memoryStore[sessionId] || [];
}
