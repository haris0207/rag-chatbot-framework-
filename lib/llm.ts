import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
export async function generateWithGemini(prompt: string): Promise<string> {

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // or "gemini-2.5-pro"
    contents: prompt,
  });
console.log("Response from Gemini:", response.candidates);
  return response.text ?? "";
}
