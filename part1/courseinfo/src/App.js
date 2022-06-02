import React from "react";

import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Total from "./components/total/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const total = course.parts.reduce((pre, item) => {
    pre += item.exercises;
    return pre;
  }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default App;
