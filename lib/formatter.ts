export function formatBotReply(rawReply: string): string {
  let reply = rawReply.trim();

  // Remove filler phrases
  reply = reply.replace(/I (apologize|am sorry)[^.!?]*[.!?]/gi, "").trim();

  // Fix bold heading format like **X:*-  →  **X:**
  reply = reply.replace(/\*\*(.+?):\*-/g, "**$1:**");

  // Normalize bullets
  reply = reply
    .replace(/\*\s+/g, "- ")
    .replace(/•\s+/g, "- ");

  return reply;
}