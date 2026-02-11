"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/music")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.songs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🎵 Music Lyrics App
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading songs...</p>
        ) : (
          <div className="space-y-4">
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {song.title}
                </h2>
                <p className="text-gray-500">{song.artist}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
