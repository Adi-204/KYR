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

    const prompt = "You are a Senior Technical Recruiter with 15+ years of experience. Thoroughly analyze the provided resume, focusing on the candidate's core technical skills, significant achievements, and relevant project experience across all listed technologies and roles. Generate 5 highly challenging, practical, and scenario-based technical multiple-choice questions. Ensure these questions cover a diverse range of skills and experiences demonstrated in the resume. Each question must: 1. Probe for deep understanding and application of concepts. 2. Be directly relevant to specific technologies, projects, or responsibilities mentioned. 3. Avoid generic definitions or easily guessable answers. 4. Ask about internal mechanisms, performance implications, common pitfalls, advanced concepts, or complex problem-solving specific to the listed skills. For each question, provide 4 distinct options, with one correct answer and three plausible, nuanced distractors that reveal a lack of true understanding.";
    
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
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING },
            },
            propertyOrdering: ["question", "options", "correctAnswer"],
            required: ["question", "options", "correctAnswer"]
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
      mcqs: parsedQuestions
    });

  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}


