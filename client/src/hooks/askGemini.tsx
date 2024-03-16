import { GoogleGenerativeAI } from "@google/generative-ai";

export async function askGemini(text: string) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
        "I am sending question that were answered wrong by me in a quiz. And tell how i can improve in that topic" +
        text;

    async function run(prompt: any) {
        const result: any = await model.generateContent(prompt);
        const response = await result.response;
        const ansText = await response.text();
        console.log(ansText);
        return ansText;
    }
    run(prompt);
}
