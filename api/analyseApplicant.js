import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { job, applicants } = req.body;

    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is missing");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const prompt = `
You are an AI HR specialist.

Evaluate the job against **multiple candidates** and return a JSON array.

JOB DETAILS:
Title: ${job.title}
Description: ${job.description}
Required Skills: ${job.requiredSkills?.join(", ")}

APPLICANT RESUMES:
${applicants
  .map(
    (a, i) => `
APPLICANT ${i + 1}
userId: ${a.userId}
resume:
${a.resumeParsedText}
`
  )
  .join("\n")}

TASK:
For each applicant, return the following JSON array ONLY:

[
  {
    "userId": "...",
    "score": number,
    "selected": boolean
  },
  ...
]

Rules:
- score must be between 0 and 100
- selected = true if score >= 70
- Do not add comments or text outside JSON
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.text;

let raw = text.trim();

raw = raw.replace(/```json/gi, "")
         .replace(/```/g, "")
         .trim();

let parsed = [];
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error("JSON parse failed, raw:", raw);
  parsed = applicants.map(a => ({
    userId: a.userId,
    score: 0,
    selected: false
  }));
}


    return res.status(200).json({
      success: true,
      results: parsed,
    });

  } catch (error) {
    console.error("Error in batch analyseApplicant:", error);

    return res.status(500).json({
      success: false,
      message: "AI error",
      error: error.message,
    });
  }
}
