import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function runChat(prompt) {
  if (!prompt) return "";

  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}

export default runChat;
