import React from "react";

function RatingBar({ onSave, onNext, onUpVote, upVotes }) {
  return (
    <div className="rating-bar">
      <button onClick={onUpVote}>&#x7c; {upVotes} &#x7c;  &#128077;</button>
      <button onClick={onSave}>💾 Save</button>
      <button onClick={onNext}>Next &#x2192;</button>

    </div>
  );
}

export default RatingBar;
