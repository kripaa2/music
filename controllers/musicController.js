const axios = require("axios");
const admin = require("../config/firebase");

const searchSong = async (req, res) => {
  const { song, artist } = req.query;

  if (!song || !artist) {
    return res.status(400).json({ message: "Song and artist required" });
  }

  try {
    const response = await axios.get(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`
    );

    await admin.firestore().collection("searchHistory").add({
      userId: req.user.uid,
      song,
      artist,
      searchedAt: new Date()
    });

    res.json({
      song,
      artist,
      lyrics: response.data.lyrics
    });
  } catch (error) {
    res.status(404).json({
      message: "Lyrics not found. Try exact song and artist name."
    });
  }
};

module.exports = { searchSong };
