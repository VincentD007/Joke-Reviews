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

  const saveMeme = (meme) => {
    if (!savedMemes.find((m) => m.url === meme.url)) {
      setSavedMemes([...savedMemes, meme]);
    }
  };

  const removeMeme = (url) => {
    setSavedMemes(savedMemes.filter((m) => m.url !== url));
  };

  return (
    <SavedContext.Provider value={{ savedMemes, saveMeme, removeMeme }}>
      {children}
    </SavedContext.Provider>
  );
};