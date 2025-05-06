import React from "react";

function RatingBar({ onSave, onNext}) {
  return (
    <div className="rating-bar">
      <button onClick={onSave}>💾 Save</button>
      <button onClick={onNext}>Next ➡</button>
    </div>
  );
}

export default RatingBar;
