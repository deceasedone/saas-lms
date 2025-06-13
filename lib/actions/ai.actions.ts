"use server"

// IMPROVEMENT: Import 'generateObject' for structured JSON output and 'zod' for schema definition.
import { generateObject, generateText } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

/**
 * Generates structured notes from a chat transcript.
 * Your original implementation was already excellent for this task.
 * 
 * @param transcript The full transcript of the learning session.
 * @param subject The general subject of the lesson (e.g., "Physics").
 * @param topic The specific topic of the lesson (e.g., "Newton's Laws of Motion").
 * @returns A promise that resolves to a markdown string of study notes.
 */
export async function generateNotesFromTranscript(
  transcript: string, 
  subject: string, 
  topic: string
): Promise<string> {
  try {
    const prompt = `You are an expert educator specializing in ${subject}, particularly knowledgeable about ${topic}. Below is a transcript of a learning session between an AI tutor and a student on this topic.

${transcript}

Create comprehensive, well-structured study notes based on this conversation. Format the notes with:

1. A clear title
2. Section headings (using # for main headings, ## for subheadings)
3. Bullet points for key concepts (using - for bullets)
4. Numbered lists for sequential processes or steps (using 1., 2., etc.)
5. Important definitions, formulas, or concepts highlighted
6. A brief summary at the end

Make the notes concise but thorough, focusing on the most important concepts discussed in the session. Organize the information logically and ensure it would be useful for a student reviewing this material later.`

    // Using generateText is perfect here as we expect a formatted string.
    const { text } = await generateText({
      model: google("gemini-1.5-flash"), // This model choice is perfect.
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return text
  } catch (error: any) {
    console.error("Error generating notes:", error)
    
    // Your error handling is great, no changes needed here.
    if (error?.statusCode === 429 || error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      throw new Error("Gemini API quota exceeded or rate limited. Please check your usage limits.")
    }
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      throw new Error("Invalid Gemini API key or insufficient permissions. Please check your API key configuration.")
    }
    if (error?.message?.includes('safety') || error?.message?.includes('blocked')) {
      throw new Error("Content was blocked by Gemini's safety filters. Please try with different content.")
    }
    
    throw new Error(`Failed to generate notes: ${error?.message || 'Unknown error'}`)
  }
}

// NEW: Define a Zod schema for the quiz structure.
// This ensures the AI's output is strictly typed and validated automatically.
const quizSchema = z.array(
  z.object({
    question: z.string().describe("The multiple-choice question."),
    options: z.array(z.string()).length(4).describe("An array of exactly 4 possible answers."),
    correctAnswer: z.number().min(0).max(3).describe("The 0-based index of the correct answer in the options array."),
  })
)

// Define a type for a single quiz question based on the schema for cleaner code.
type QuizQuestion = z.infer<typeof quizSchema>[number];

/**
 * Generates a quiz with multiple-choice questions from a chat transcript.
 * 
 * @param transcript The full transcript of the learning session.
 * @param subject The general subject of the lesson.
 * @param topic The specific topic of the lesson.
 * @returns A promise that resolves to an array of quiz question objects.
 */
export async function generateQuizFromTranscript(
  transcript: string, 
  subject: string, 
  topic: string
): Promise<QuizQuestion[]> {
  try {
    const prompt = `You are an expert educator specializing in ${subject}, particularly knowledgeable about ${topic}. Below is a transcript of a learning session between an AI tutor and a student on this topic.

${transcript}

Create a quiz with 10 multiple-choice questions based on the content of this learning session. Ensure the questions test understanding rather than just recall, and cover the most important concepts from the session. Make sure the incorrect options are plausible but clearly wrong to someone who understood the material.`

    // IMPROVEMENT: Use `generateObject` instead of `generateText`.
    // This is more reliable for getting structured JSON output.
    // The AI SDK handles the parsing and validation against the Zod schema.
    const { object: quizData } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: quizSchema, // Provide the schema for validation
      prompt,
      temperature: 0.7,
    })

    // No need for manual JSON.parse or validation loops; it's handled by generateObject.
    return quizData

  } catch (error: any) {
    console.error("Error generating quiz:", error)
    
    // Your specific error checks are still valuable.
    if (error?.statusCode === 429 || error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      throw new Error("Gemini API quota exceeded or rate limited. Please check your usage limits.")
    }
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      throw new Error("Invalid Gemini API key or insufficient permissions. Please check your API key configuration.")
    }
    if (error?.message?.includes('safety') || error?.message?.includes('blocked')) {
      throw new Error("Content was blocked by Gemini's safety filters. Please try with different content.")
    }
    
    // A Zod/schema validation error might be thrown here if the model fails to comply.
    // The default error message is usually descriptive enough.
    // We no longer need to explicitly check for SyntaxError.
    
    throw new Error(`Failed to generate quiz: ${error?.message || 'Unknown error'}`)
  }
}