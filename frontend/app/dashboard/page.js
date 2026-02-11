"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [inputLyrics, setInputLyrics] = useState("");
  const [mood, setMood] = useState("happy");

  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  // 🎵 Search Lyrics
  const searchSong = async () => {
    setLoading(true);

    const res = await fetch(
      `http://127.0.0.1:5000/api/music/search?song=${song}&artist=${artist}`
    );

    const data = await res.json();
    setLyrics(data.lyrics || "Lyrics not found");
    setLoading(false);
  };

  // 🤖 Generate AI Lyrics
  const generateAI = async () => {
    if (!prompt) return alert("Enter prompt");

    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setLyrics(data.response || "AI Error");
    setLoading(false);
  };

  // 🔥 Mood Transformer (FIXED LOCATION)
  const transformMood = async () => {
    if (!inputLyrics) return alert("Paste lyrics first");

    setLoading(true);

    const res = await fetch("http://127.0.0.1:5000/api/ai/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lyrics: inputLyrics,
        mood: mood,
      }),
    });

    const data = await res.json();
    setLyrics(data.response || "Transformation failed");
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-10">LyrixAI</h1>

        <button className="block mb-4 text-gray-300">🎵 Search Lyrics</button>
        <button className="block mb-4 text-gray-300">🤖 AI Generator</button>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">Music Tools</h2>

          {/* Search Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Search Song Lyrics</h3>

            <input
              placeholder="Song Name"
              className="w-full p-3 border rounded mb-2"
              onChange={(e) => setSong(e.target.value)}
            />

            <input
              placeholder="Artist Name"
              className="w-full p-3 border rounded mb-2"
              onChange={(e) => setArtist(e.target.value)}
            />

            <button
              onClick={searchSong}
              className="bg-black text-white px-5 py-2 rounded"
            >
              Search Lyrics
            </button>
          </div>

          {/* AI Generator */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Generate AI Lyrics</h3>

            <input
              placeholder="Write a sad Kannada song about dreams"
              className="w-full p-3 border rounded mb-2"
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={generateAI}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Generate with AI
            </button>
          </div>

          {/* 🔥 Mood Transformer UI */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Mood Transformer</h3>

            <textarea
              placeholder="Paste lyrics here..."
              className="w-full p-3 border rounded mb-2"
              onChange={(e) => setInputLyrics(e.target.value)}
            />

            <select
              className="border p-2 rounded mb-2"
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="motivational">Motivational</option>
              <option value="romantic">Romantic</option>
              <option value="dark">Dark</option>
            </select>

            <button
              onClick={transformMood}
              className="bg-purple-600 text-white px-5 py-2 rounded"
            >
              Transform Mood
            </button>
          </div>

          {/* Output */}
          <div className="mt-6 bg-gray-50 p-4 rounded whitespace-pre-wrap">
            {loading ? "Loading..." : lyrics}
          </div>

        </div>
      </div>
    </div>
  );
}
