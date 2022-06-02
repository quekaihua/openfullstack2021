import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [most, setMost] = useState(-1);

  let renderMost;
  if (most > -1) {
    renderMost = (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[most]}</p>
      </div>
    );
  }

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <p>
        <button
          onClick={() => {
            const newPoints = [...points];
            newPoints[selected]++;
            if (most === -1 || newPoints[selected] > newPoints[most]) {
              setMost(selected);
            }
            setPoints(newPoints);
          }}
        >
          vote
        </button>
        <button
          onClick={() => {
            const next = Math.floor(anecdotes.length * Math.random());
            setSelected(next);
          }}
        >
          next anecdote
        </button>
      </p>
      {renderMost}
    </>
  );
};

export default App;
