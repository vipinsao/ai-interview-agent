// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import aiFeedbackRoutes from "./routes/aiFeedback.js";
import aiModelRoutes from "./routes/aiModel.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ai-interview-agent-gules.vercel.app/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/ai-feedback", aiFeedbackRoutes);
app.use("/api/ai-model", aiModelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
