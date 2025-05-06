import React, { useState, useEffect } from "react";
import NavBar from "./Navbar.jsx";
import RatingBar from "./RatingBar.jsx";
import "/src/Styles/Home.css";
import { useSaved } from "../Context/SavedContext";

const SubredditURLs = [
  'okbuddyretard',
  'dankmemes',
  'cringememes',
  'cringe',
  'funnybutwhy',
  'ProgrammerHumor',
  'programmingmemes',
]

function getRandomElement(arr) {
  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);
  const randomIndex = randomArray[0] % arr.length;
  return arr[randomIndex];
}

export default function Home() {
  const [randomMeme, setRandomMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const { saveMeme } = useSaved();

  const fetchNewMeme = async () => {
    setLoading(true);
    setError(null);
    const subreddit = getRandomElement(SubredditURLs); // Select a random subreddit dynamically
    const reddit_API = `https://meme-api.com/gimme/${subreddit}`; // Generate the API URL dynamically
    try {
      const response = await fetch(reddit_API);
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setRandomMeme({
        url: data.url,
        title: data.title,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewMeme();
  }, []);

  const handleSaveMeme = () => {
    console.log("Save button clicked!");
    if (randomMeme) {
      saveMeme(randomMeme);
      setShowSavedPopup(true);
      setTimeout(() => setShowSavedPopup(false), 2000);
    }
  };

  const handleNext = () => {
    setRandomMeme(null);
    fetchNewMeme();
  };

  return (
    <>
      <NavBar />
      <div className="home">
        <h1>Random Meme of the Day</h1>

        {loading && <p>Loading memes...😳</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {randomMeme && (
  <div className="meme-card">
    <img
      src={randomMeme.url}
      alt={randomMeme.title || "Random meme"}
      style={{ maxWidth: "600px", borderRadius: "8px" }}
    />
    <RatingBar onSave={handleSaveMeme} onNext={handleNext} />
  </div>
)}

{showSavedPopup && (
  <div className="popup-message">
    Meme Saved!
  </div>
)}
      </div>
    </>
  );
}