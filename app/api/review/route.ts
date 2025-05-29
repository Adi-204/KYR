import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";
import fetch from 'node-fetch'; // Keep if fetching PDF, remove if not.

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

    const prompt = `You are a Senior Technical Recruiter with 15+ years of experience. Analyze the provided resume.
FOR EACH SECTION (score 0-100 with strict grading): 3 SPECIFIC positives (quote exact phrases that work well), 3 ACTIONABLE critiques (show exact text to change) and 2 PRECISE improvement examples (show before/after)
1. Clarity/Readability: Evaluate structure, formatting, whitespace." 
2. Content Quality: Assess quantified achievements and role-specific details."
3. Technical Skills: Review organization, relevance, proficiency indicators."
4. Experience Relevance: Analyze career progression and gap explanation."
5. Education/Certs: Check presentation and ongoing learning."
6. Keyword Optimization: Evaluate ATS compatibility."
7. Role Customization: Assess targeting for specific jobs."
8. Error Checking: Identify grammar, tense, factual issues."
Give me overall strengths, areas for improvement, and actionable suggestions, and assign a overall positive integer score (0-100).
        `;

    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: Buffer.from(pdfResp).toString("base64")
        }
      }
    ];

    const reviewResponse = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { 
              type: Type.NUMBER,
              description: "Overall resume score from 0-100"
            },
            strengths: {
              type: Type.ARRAY,
              items: { 
                type: Type.STRING,
                description: "Key strengths of the resume"
              },
              minItems: 1,
              maxItems: 10
            },
            areasForImprovement: {
              type: Type.ARRAY,
              items: { 
                type: Type.STRING,
                description: "Key areas needing improvement"
              },
              minItems: 1,
              maxItems: 10
            },
            specificRecommendations: {
              type: Type.ARRAY,
              items: { 
                type: Type.STRING,
                description: "Actionable recommendations"
              },
              minItems: 1,
              maxItems: 10
            },
            detailedFeedback: {
              type: Type.OBJECT,
              properties: {
                clarityAndReadability: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { 
                        type: Type.STRING,
                        description: "specific positive aspects with exact quotes"
                      },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { 
                        type: Type.STRING,
                        description: "actionable critiques with exact text to change"
                      },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { 
                        type: Type.STRING,
                        description: "precise improvement examples with before/after text"
                      },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { 
                      type: Type.NUMBER,
                      description: "Score from 0-100 for this section"
                    }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                contentQuality: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                technicalSkills: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                experienceRelevance: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                educationAndCerts: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                keywordOptimization: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                customizationForTargetRoles: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                },
                errorChecking: {
                  type: Type.OBJECT,
                  properties: {
                    positives: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    critiques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    improvements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      minItems: 1,
                      maxItems: 3
                    },
                    score: { type: Type.NUMBER }
                  },
                  required: ["positives", "critiques", "improvements", "score"]
                }
              },
              required: [
                "clarityAndReadability",
                "contentQuality",
                "technicalSkills",
                "experienceRelevance",
                "educationAndCerts",
                "keywordOptimization",
                "customizationForTargetRoles",
                "errorChecking"
              ]
            }
          },
          required: ["overallScore", "strengths", "areasForImprovement", "detailedFeedback", "specificRecommendations"]
        }
      }
    });

    const review = reviewResponse.candidates?.[0]?.content?.parts?.[0]?.text;

    let parsedReview = {};

    try {
      parsedReview = review ? JSON.parse(review) : {};
    } catch (e) {
      console.error("Failed to parse review:", e);
    }

    console.log(parsedReview);
    return NextResponse.json({
      resumeReview: parsedReview
    });

  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}

