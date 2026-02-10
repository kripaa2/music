const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const explainLyrics = async (req, res) => {
  const { lyrics } = req.body;

  if (!lyrics) {
    return res.status(400).json({ message: "Lyrics required" });
  }

  try {
   const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });


    const prompt = `
Analyze the following song lyrics.

1. Detect the overall mood (Happy, Sad, Romantic, Motivational, Angry).
2. Explain the meaning in simple words.

Lyrics:
${lyrics}

Respond ONLY in valid JSON like this:
{
  "mood": "Romantic",
  "explanation": "Short explanation here"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 🔥 Parse Gemini JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd));

    res.json({
      mood: parsed.mood,
      explanation: parsed.explanation
    });

  } catch (error) {
  console.error("Gemini API error:", error);

  res.status(500).json({
    mood: "Unknown",
    explanation: "Gemini API error. Check backend logs."
  });
}

};

module.exports = { explainLyrics };
