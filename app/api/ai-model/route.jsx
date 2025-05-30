import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  console.log(FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    // Log the full completion response for debugging
    console.log("API Response:", completion);

    // Check if choices exist and are not empty
    if (completion.choices && completion.choices.length > 0) {
      return NextResponse.json(completion.choices[0].message.content);
    } else {
      // Handle the case where choices is empty or not present
      return NextResponse.json({ error: "No response from OpenAI model." });
    }
  } catch (e) {
    console.log("Error", e);
    return NextResponse.json(e);
  }
}
