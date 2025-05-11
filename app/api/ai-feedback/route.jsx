import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
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
