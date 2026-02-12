const express = require("express");
const router = express.Router();
const axios = require("axios");

// Default test route
router.get("/", (req, res) => {
  res.json({
    success: true,
    songs: [
      { id: 1, title: "Song One", artist: "Artist A" },
      { id: 2, title: "Song Two", artist: "Artist B" },
    ],
  });
});

// Search lyrics route
router.get("/search", async (req, res) => {
  const { song, artist } = req.query;

  try {
    const response = await axios.get(
      `https://api.lyrics.ovh/v1/${artist}/${song}`
    );

    res.json({ lyrics: response.data.lyrics });
  } catch (error) {
    res.json({ lyrics: "Lyrics not found." });
  }
});

module.exports = router;
