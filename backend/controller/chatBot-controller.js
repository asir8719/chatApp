import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAfMElWRC1yvH89LCcOZEkH7s-U1Gxk_bM" });
export const chatbot = async (req, res) => {
    try {
        const {message} = req.body
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{text: message}],
        });
        res.status(200).json({reply: response.text})
    } catch (error) {
        res.status(500).json({error: error})
    }
}