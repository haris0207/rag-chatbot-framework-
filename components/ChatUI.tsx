// components/ChatUI.tsx
"use client";

import { useState } from "react"; // Added useEffect for localStorage
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());
   const currentIndustry = "resume"; 
  const [loading, setLoading] = useState(false); // Added loading state for better UX

  // Load messages from localStorage on initial mount
  

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input immediately for better UX
    setLoading(true); // Set loading true while waiting for response

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage.content, // Send only the content string
          industry: "portfolio", // ✅ Pass the selected industry to the backend
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();

      const botMessage: Message = {
        role: "bot",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      // Optionally add an error message to the chat
      setMessages((prev) => [...prev, { role: "bot", content: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false); // Set loading false after response or error
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto shadow-lg bg-white">
      {/* Industry Selector component */}
 {/* ✅ Render IndustrySelector */}

      <div className="h-64 overflow-y-auto border-b mb-2 p-2 bg-gray-50 rounded-md">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.role === "user" ? "text-right text-blue-600" : "text-left text-green-700"
            }`}
          >
            <span>
              <b>{msg.role === "user" ? "You" : "Bot"}:</b> <ReactMarkdown>{msg.content}</ReactMarkdown>
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Bot is typing...</div>}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Ask about ${currentIndustry.replace('_', ' ')}...`}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
