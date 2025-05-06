import React, { useState } from "react";
import { useSaved } from "../Context/SavedContext";
import NavBar from "./Navbar";
import "/src/Styles/UserSaved.css";

export default function UserSaved() {
  const { savedMemes, removeMeme, updateMemeNote } = useSaved();
  const [sortOrder, setSortOrder] = useState("newest");

  const sortedMemes = [...savedMemes].sort((a, b) => {
    if (sortOrder === "newest") return b.savedAt - a.savedAt;
    if (sortOrder === "oldest") return a.savedAt - b.savedAt;
    return 0;
  });

  return (
    <>
      <NavBar />
      <div className="saved-page">
        <h1>Your Saved Memes</h1>

        {savedMemes.length === 0 ? (
          <p>No memes saved yet. Go grab some laughs!</p>
        ) : (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="sortOrder" style={{ marginRight: "0.5rem" }}>
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <div className="meme-grid">
              {sortedMemes.map((meme, index) => (
                <div key={index} className="meme-card">
                  <img src={meme.url} alt={meme.title} className="meme-image" />
                  <button onClick={() => removeMeme(meme.url)}>Remove</button>
                  <textarea
                    placeholder="Write a note about this meme..."
                    value={meme.note || ""}
                    onChange={(e) => updateMemeNote(meme.url, e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontFamily: "inherit",
                    }}
                  ></textarea>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
