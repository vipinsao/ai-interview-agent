// backend/routes/aiModel.js
import express from "express";
import OpenAI from "openai";
const router = express.Router();

router.post("/", async (req, res) => {
  const { jobPosition, jobDescription, duration, type } = req.body;

  const FINAL_PROMPT = `Generate interview questions for the following:\n\nJob Title: ${jobPosition}\nDescription: ${jobDescription}\nDuration: ${duration}\nType: ${type}`;

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    if (completion.choices?.length > 0) {
      res.json({ questions: completion.choices[0].message.content });
    } else {
      res.status(400).json({ error: "No questions generated." });
    }
  } catch (error) {
    console.error("Question Gen Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
