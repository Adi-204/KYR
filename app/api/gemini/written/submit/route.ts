import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: Request) {
    try {
        const { questionAnswerPairs } = await request.json();

        if (!questionAnswerPairs || questionAnswerPairs.length === 0) {
            return NextResponse.json(
                { error: "No question and answer pairs provided for evaluation." },
                { status: 400 }
            );
        }

        const modelName = "gemini-2.0-flash";

        // The new concise evaluation prompt
        const evaluationPrompt = `You are a Senior Technical Recruiter with 15+ years of experience.Evaluate each provided 'answer' for its corresponding 'question'. For each questionAnswerPair, provide a 'score' (integer from 0 to 10) and detailed 'feedback' (string) based on: Evaluation Criteria: 1. Accuracy & Depth: Is the answer technically correct? Does it demonstrate deep understanding, internal mechanisms, or complex problem-solving where applicable? 2. Relevance & Specificity: Does the answer directly address the question and provide specific, relevant details? 3. Clarity & Conciseness: Is the answer clear, well-structured, and to the point? 4. Problem-Solving/Behavioral Insight: Does it demonstrate logical problem-solving, critical thinking, or relevant soft skills (e.g., communication, collaboration, leadership, adaptability, conflict resolution)? For each provide original question, answer, detailed feedback should be specific if there are inaccuracies or omissions in the user's answer, explicitly state what was wrong or missing in the user's answer and then provide the actual correct information in feedback and score. Here are the question and answer pairs to evaluate:\n${JSON.stringify(questionAnswerPairs, null, 2)}`;

        const contents = [
            { text: evaluationPrompt }
        ];

        const evaluationResponse = await ai.models.generateContent({
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
                            answer: { type: Type.STRING },
                            score: { type: Type.INTEGER },
                            feedback: { type: Type.STRING },
                        },
                        propertyOrdering: ["question", "answer", "score", "feedback"],
                        required: ["question", "answer", "score", "feedback"]
                    }
                }
            }
        });

        const responseText = evaluationResponse.candidates?.[0]?.content?.parts?.[0]?.text;

        let parsedResponse = [];

        try {
            parsedResponse = responseText ? JSON.parse(responseText) : [];
        } catch (e) {
            console.error("Failed to parse evaluation response:", e);
        }

        return NextResponse.json({
            results: parsedResponse
        });

    } catch (error) {
        console.error("Error during evaluation:", error);
        return NextResponse.json(
            { error: "Failed to evaluate answers" },
            { status: 500 }
        );
    }
}

