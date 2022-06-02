import React, { useState } from "react";
import Button from "./components/button/Button";
import Statistics from "./components/statistics/Statistics";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        feedback="good"
        setFeedback={() => {
          setGood((good) => good + 1);
        }}
      />
      <Button
        feedback="neutral"
        setFeedback={() => {
          setNeutral((neutral) => neutral + 1);
        }}
      />
      <Button
        feedback="bad"
        setFeedback={() => {
          setBad((bad) => bad + 1);
        }}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
