import React from "react";
import GoogleGenerativeAI from "@google/generative-ai";
export default function useGemini(text: string) {
    // @ts-ignore
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
}
