import OpenAI from "openai";
import { midnightMagicSchool } from "../data/midnightStory.js";

function cleanJson(text) {
  const cleaned = text
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function generateStory({ topic, audience, style, panels }) {
  if (!process.env.OPENAI_API_KEY) {
    return midnightMagicSchool;
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
Create a student-friendly comic story for the topic "${topic}".

Requirements:
- Audience: ${audience}
- Style: ${style}
- Exactly ${Math.min(Math.max(panels, 4), 8)} panels.
- Make it unique and enjoyable.
- Keep it suitable for school students.
- Every panel must have a clear situation.
- Use recurring characters.
- Include narration, one speaker, dialogue, and a visual action for every panel.
- Return ONLY valid JSON. No markdown.

JSON shape:
{
  "title": "string",
  "introduction": "string",
  "panels": [
    {
      "id": 1,
      "title": "string",
      "narration": "string",
      "speaker": "string",
      "dialogue": "string",
      "action": "string",
      "characters": ["string"]
    }
  ],
  "conclusion": "string"
}
`;

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
    input: prompt
  });

  const text = response.output_text;
  const story = cleanJson(text);

  if (!story.panels || !Array.isArray(story.panels) || story.panels.length === 0) {
    throw new Error("AI returned an invalid story structure.");
  }

  return story;
}