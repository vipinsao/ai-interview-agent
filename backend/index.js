// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import aiFeedbackRoutes from "./routes/aiFeedback.js";
import aiModelRoutes from "./routes/aiModel.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://ai-interview-agent-gules.vercel.app", // your deployed Vercel domain
];

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/ai-feedback", aiFeedbackRoutes);
app.use("/api/ai-model", aiModelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
