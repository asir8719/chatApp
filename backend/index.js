import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyAfMElWRC1yvH89LCcOZEkH7s-U1Gxk_bM" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "i am trying to integrate you in my ai chatbot ",
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    }
  });
  console.log(response.text);
}

main();