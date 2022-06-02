import React from "react";

import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Total from "./components/total/Total";

const App = () => {
  const course = "Half Stack application development";

  const courses = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  const renderedContent = courses.map((item) => (
    <Content part={item.part} exercises={item.exercises} />
  ));

  const total = courses.reduce((pre, item) => {
    pre += item.exercises;
    return pre;
  }, 0);

  return (
    <div>
      <Header course={course} />
      {renderedContent}
      <Total total={total} />
    </div>
  );
};

export default App;
