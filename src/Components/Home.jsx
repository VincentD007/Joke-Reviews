import React, { useState, useEffect } from "react";
import NavBar from "./Navbar.jsx";
import RatingBar from "./RatingBar.jsx";
import "/src/Styles/Home.css";
import { useSaved } from "../Context/SavedContext";

const SubredditURLs = [
  'okbuddyretard',
  'dankmemes',
  'cringememes',
  'AdviceAnimals',
  'funnybutwhy',
  'ProgrammerHumor',
  'programmingmemes',
  'ComedyCemetery',
  'memes',
  'PrequelMemes',
  'terriblefacebookmemes',
  'funny',
  'teenagers',
  'lastimages',
  'comedyheaven',
  'simpsonsmemes',
  'AnimeMemes',
  'gymmemes',
  'minecraftmemes',
  'relatablememes',
  'brainrot',
  'shitposting',
  'BoneHurtingJuice',
  'HistoryMemes',
  'surrealmemes',
  'militarymemes',
  'militarymeme',
  'NonCredibleDefense',
  'JustBootThings',
  'Military',
  'Catstandingup',
  'Oldpeoplefacebook',
  'BreadStapledtoTrees',
  'AirForce'
];

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function MemeImage({ randomMeme, loading }) {
  return (
    <div className="meme-image-container">
      {loading ? (
        <p>Loading meme... 😅</p>
      ) : (
        <img
          src={randomMeme?.url}
          alt={randomMeme?.title || "Random meme"}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      )}
    </div>
  );
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
    const subreddit = getRandomElement(SubredditURLs); 
    const reddit_API = `https://meme-api.com/gimme/${subreddit}`;
    try {
      const response = await fetch(reddit_API);
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(`Bad Request: Subreddit "${subreddit}" might be invalid or restricted.`);
        }
        throw new Error(`Status ${response.status}`);
      }
      const data = await response.json();
      setRandomMeme({
        url: data.url,
        title: data.title,
        subreddit: data.subreddit,
        upVotes: data.ups,
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

  const handleNext = async () => {
    await fetchNewMeme();
  };

  const handleUpVote = () => {
    if (randomMeme) {
      setRandomMeme((prevMeme) => ({
        ...prevMeme,
        upVotes: prevMeme.upVotes + 1,
      }));
    }
  };

  return (
    <>
      <NavBar />
      <div className="home">

        {randomMeme && <h3>r/{randomMeme.subreddit}</h3>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="meme-card">
          <MemeImage randomMeme={randomMeme} loading={loading} />
          {randomMeme && (
            <RatingBar
              onSave={handleSaveMeme}
              onNext={handleNext}
              onUpVote={handleUpVote}
              upVotes={randomMeme.upVotes}
            />
          )}
        </div>

        {showSavedPopup && (
          <div className="popup-message">
            Meme Saved!
          </div>
        )}
      </div>
    </>
  );
}