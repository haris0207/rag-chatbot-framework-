// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { ragPipeline } from "@/lib/pipeline"; // ✅ Import ragPipeline
import { addMessage, getMessages } from "@/lib/memory";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ✅ Extract the industry parameter, with a default value
    const { sessionId, message, industry = "portfolio" } = body;
    console.log(`🔎 Chat request using industry: ${industry}`);


    if (!sessionId || !message) {
      return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 });
    }

    // 1. Save user message to memory
    addMessage(sessionId, "user", message);

    // 2. Get conversation history
    const history = getMessages(sessionId);

    // 3. ✅ Call the RAG pipeline, passing the industry, message, and history
    const botReply = await ragPipeline(industry, message, history);

    // 4. Save the bot's reply to memory
    addMessage(sessionId, "bot", botReply);

    // 5. Return the final response
    return NextResponse.json({ reply: botReply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
