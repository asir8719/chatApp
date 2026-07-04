import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const chatbot = async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
        }

        const { message } = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ text: message }],
        });

        res.status(200).json({ reply: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
};
