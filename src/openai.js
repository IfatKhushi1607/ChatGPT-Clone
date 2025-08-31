
import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize Gemini configuration
function createGeminiClient() {
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  return new GoogleGenerativeAI(API_KEY);
}

export async function sendMsgToGemini(message) {
  try {
    const genAI = createGeminiClient();
    // Using the correct model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble processing your request.";
  }
}