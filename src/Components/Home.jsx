import React, { useState, useEffect } from 'react';
import NavBar from '/src/Components/Navbar.jsx';
import RatingBar from '/src/Components/RatingBar.jsx';
import API_KEYS from '/config.js';
import '/src/Styles/Home.css';

const RANDOM_URL = "https://api.humorapi.com/memes/random";

export default function Home() {
  const [randomMeme, setRandomMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tryKeys = async (url) => {
    for (let i = 0; i < API_KEYS.length; i++) {
      const key = API_KEYS[i];
      try {
        const res = await fetch(`${url}&api-key=${key}`);
        if (res.status === 429 || res.status === 402) {
          console.warn(`Key ${i + 1} blocked or out of credits (status ${res.status}). Trying next...`);
          continue;
        }
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        return data;
      } catch (err) {
        console.warn(`Key ${i + 1} failed: ${err.message}`);
        continue;
      }
    }
    throw new Error("All API keys failed due to rate limits, payment errors, or other issues.");
  };

  useEffect(() => {
    const fetchMemes = async () => {
      setLoading(true);
      setError(null);

      try {
        const randomData = await tryKeys(RANDOM_URL);

        setRandomMeme(randomData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Random Meme of the Day</h1>
        {loading && <p>Loading memes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {randomMeme && (
          <div className="meme-card">
            <img
              src={randomMeme.url}
              alt="Random meme"
              style={{ maxWidth: "400px", borderRadius: "8px" }}
            />
            <RatingBar />
          </div>
        )}
        </div>
    </>
  );
}