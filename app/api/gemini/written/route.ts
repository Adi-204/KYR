import { NextResponse } from 'next/server';
import { GoogleGenAI, createUserContent, createPartFromUri, Type } from "@google/genai";
import fetch from 'node-fetch';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: Request) {
    try {
        const { cloudinaryPdfUrl } = await request.json();

        if (!cloudinaryPdfUrl) {
            return NextResponse.json(
                { error: "Cloudinary PDF URL is required" },
                { status: 400 }
            );
        }

        const response = await fetch(cloudinaryPdfUrl);

        if (!response.ok) throw new Error("Failed to fetch PDF from Cloudinary");

        const pdfResp = await response.arrayBuffer();

        const modelName = "gemini-2.0-flash";

        const prompt = "You are a Senior Technical Recruiter with 15+ years of experience. Thoroughly analyze the provided resume, focusing on the candidate's core technical skills, significant achievements, and relevant project experience across all listed technologies and roles. Generate 5 highly challenging and insightful questions that cover a diverse and balanced range of topics, including deeply technical written (open-ended), soft skills, and situation-based scenarios. Crucially, each question must be a single, focused inquiry, avoid combining multiple distinct sub-questions or concepts into one. The aim is clarity and directness. Each question must: 1. Probe for deep understanding and application of concepts. 2. Anchored to specific details, skills, experiences, or roles mentioned in the resume. 3. Ask about internal mechanisms, performance implications, common pitfalls, advanced concepts, or complex problem-solving specific to the listed skills. 4. Avoid Triviality: Absolutely no generic, definition-based, or easily answerable questions. I only need questions.";

        const contents = [
            { text: prompt },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfResp).toString("base64")
                }
            }
        ];

        const mcqResponse = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                        },
                        propertyOrdering: ["question"],
                        required: ["question"]
                    }
                }
            }
        });

        const questions = mcqResponse.candidates?.[0]?.content?.parts?.[0]?.text;

        let parsedQuestions = [];

        try {
            parsedQuestions = questions ? JSON.parse(questions) : [];
        } catch (e) {
            console.error("Failed to parse questions:", e);
        }

        return NextResponse.json({
            written: parsedQuestions
        });

    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { error: "Failed to process PDF" },
            { status: 500 }
        );
    }
}

