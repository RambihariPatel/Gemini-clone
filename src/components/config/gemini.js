import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔴 API KEY (direct – YouTube style)
const API_KEY = "gen-lang-client-0097314941";

// Create Gemini instance
const genAI = new GoogleGenerativeAI(API_KEY);

// Use stable model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Export function
export async function getGeminiResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating response";
  }
}
