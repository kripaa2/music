exports.transformLyrics = async (req, res) => {
  const { lyrics, mood } = req.body;

  if (!lyrics || !mood) {
    return res.json({ success: false, response: "Missing data" });
  }

  try {
    const prompt = `
    Rewrite the following song lyrics in a ${mood} mood:

    ${lyrics}
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI failed to transform";

    res.json({ success: true, response: text });
  } catch (error) {
    console.error(error);
    res.json({ success: false, response: "AI Error" });
  }
};
