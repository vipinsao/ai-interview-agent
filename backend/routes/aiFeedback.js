// backend/routes/aiFeedback.js
import express from "express";
import OpenAI from "openai";
const router = express.Router();

router.post("/", async (req, res) => {
  const { conversation } = req.body;

  const FINAL_PROMPT = `Give feedback on this interview:\n\n${JSON.stringify(
    conversation
  )}`;

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    if (completion.choices?.length > 0) {
      res.json({ response: completion.choices[0].message.content });
    } else {
      res.status(400).json({ error: "No response from OpenAI model." });
    }
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
