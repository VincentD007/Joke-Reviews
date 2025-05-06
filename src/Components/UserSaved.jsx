import React, { useState } from "react";
import { useSaved } from "../Context/SavedContext";
import NavBar from "./Navbar";
import "/src/Styles/UserSaved.css";

export default function UserSaved() {
  const { savedMemes, removeMeme } = useSaved();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % savedMemes.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? savedMemes.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <NavBar />
      <div className="saved-page">
        <h1>Your Saved Memes</h1>
        {savedMemes.length === 0 ? (
          <p>No memes saved yet. Go grab some laughs!</p>
        ) : (
          <div className="carousel-container">
            <button className="carousel-button left" onClick={handlePrevious}>
              ⬅
            </button>
            <div className="carousel-item">
              <img
                src={savedMemes[currentIndex].url}
                alt={savedMemes[currentIndex].title}
                style={{ maxWidth: "400px", borderRadius: "6px" }}
              />
              <button
                onClick={() => removeMeme(savedMemes[currentIndex].url)}
                style={{ marginTop: "0.5rem" }}
              >
                Remove
              </button>
            </div>
            <button className="carousel-button right" onClick={handleNext}>
              ➡
            </button>
          </div>
        )}
      </div>
    </>
  );
}