import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3
});

const documentAnalysisSchema = z.object({
  response: z.string(),
  suggestions: z.array(z.string()).optional()
});

type DocumentAnalysis = z.infer<typeof documentAnalysisSchema>;

export async function analyzeDocument(text: string, query: string): Promise<DocumentAnalysis> {
  try {
    console.log("Starting document analysis with OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Fallback to a more accessible model
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in document analysis and editing. 
Your role is to help users understand and work with their documents.
- When users ask questions, provide clear, relevant answers based on the document content
- When analyzing, focus on the specific aspects the user is asking about
- Keep responses concise and relevant to the user's query`
        },
        {
          role: "user",
          content: `Document content:\n${text}\n\nUser's question: ${query}`
        }
      ]
    });

    if (!response.choices[0].message.content) {
      throw new Error("No response from OpenAI");
    }

    return {
      response: response.choices[0].message.content,
      suggestions: []
    };
  } catch (error: any) {
    console.error("OpenAI Analysis Error:", error);
    if (error.status === 429) {
      throw new Error("API rate limit exceeded. Please try again in a few moments.");
    }
    throw new Error(`Failed to analyze document: ${error.message}`);
  }
}

export async function getAIEdits(
  text: string,
  instruction: string
): Promise<string> {
  try {
    console.log("Getting AI edits with instruction:", instruction);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Fallback to a more accessible model
      messages: [
        {
          role: "system",
          content: "You are a professional editor. Your task is to edit the provided text according to the user's instructions. Return ONLY the edited text, without any explanations or comments."
        },
        {
          role: "user",
          content: `Original text:\n${text}\n\nInstructions: ${instruction}\n\nProvide only the edited text as your response.`
        }
      ]
    });

    const editedText = response.choices[0].message.content;
    if (!editedText) {
      throw new Error("No response from OpenAI");
    }

    console.log("AI edit completed successfully");
    return editedText;
  } catch (error: any) {
    console.error("OpenAI Edit Error:", error);
    if (error.status === 429) {
      throw new Error("API rate limit exceeded. Please try again in a few moments.");
    }
    throw new Error(`Failed to get AI edits: ${error.message}`);
  }
}