import { Router } from "express";
import { generateStory } from "../services/ai.service.js";
import { midnightMagicSchool } from "../data/midnightStory.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ story: midnightMagicSchool, source: "built-in" });
});

router.post("/generate", async (req, res) => {
  const input = req.body || {};

  try {
    const story = await generateStory({
      topic: input.topic || "Midnight Magic School",
      audience: input.audience || "students",
      style: input.style || "unique, enjoyable comic adventure",
      panels: Number(input.panels) || 6
    });

    res.json({
      story,
      source: process.env.OPENAI_API_KEY ? "ai" : "built-in"
    });
  } catch (error) {
    console.error("Story generation error:", error);
    res.status(500).json({
      message: "Unable to create the story.",
      detail: error.message
    });
  }
});

export default router;