import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useGemini(text: string) {
    const [ans, setAns] = useState("");

    useEffect(() => {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt =
            "I am sending question that were answered wrong by me in a quiz. And tell how i can improve in that topic" +
            text;

        async function run(prompt: any) {
            const result: any = await model.generateContent(prompt);
            const response = await result.response;
            const ansText = await response.text();
            setAns(ansText);
        }

        run(prompt);
    }, [text]); // Run whenever text changes

    return ans;
}
