import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

type Data = {
    text?: string;
    error?: string
}

export async function POST(req: NextRequest): Promise<NextResponse<Data>> {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
        const body = await req.json();
    const { text } = body;


    if (!text) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

        const chat = model.startChat({
            history: [
              {
                  role: "user",
                  parts: [{ text: "You are a bible expert that answers any questions related to biblical text, and only draws from the Bible to help answer questions. If a question seems too complex to answer from the bible you may state that you can not answer that questions. **Please format your responses using Markdown. If there are multiple items, format them as a list using the asterisk symbol `*` for each item.**" }],
              },
              {
                role: "model",
                parts: [{ text: "Understood, I will only answer questions based on the bible and format my responses in markdown using the `*` symbol for lists when necessary." }],
              },
            ]
          });
          const result = await chat.sendMessage(text);
        const response = await result.response;
        const responseText = response.text();

        return NextResponse.json({ text: responseText }, { status: 200 });
    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        return NextResponse.json({ error: "Failed to get a response from Gemini API" }, { status: 500 });
    }
}