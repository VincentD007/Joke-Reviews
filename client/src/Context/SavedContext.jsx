import React, { createContext, useContext, useEffect, useState } from "react";

const SavedContext = createContext();
export const useSaved = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
  const [savedMemes, setSavedMemes] = useState(() => {
    const stored = localStorage.getItem("savedMemes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
  }, [savedMemes]);

  // ✅ Modified to include a 'note' field
  const saveMeme = (meme) => {
    if (!savedMemes.find((m) => m.url === meme.url)) {
      const memeWithTimeStamp = { ...meme, savedAt: Date.now(), note: "" };
      setSavedMemes([...savedMemes, memeWithTimeStamp]);
    }
  };

  // ✅ New function to update a note
  const updateMemeNote = (url, newNote) => {
    const updated = savedMemes.map((meme) =>
      meme.url === url ? { ...meme, note: newNote } : meme
    );
    setSavedMemes(updated);
  };

  const removeMeme = (url) => {
    setSavedMemes(savedMemes.filter((m) => m.url !== url));
  };

  // ✅ Include updateMemeNote in context value
  return (
    <SavedContext.Provider
      value={{ savedMemes, saveMeme, removeMeme, updateMemeNote }}
    >
      {children}
    </SavedContext.Provider>
  );
};
