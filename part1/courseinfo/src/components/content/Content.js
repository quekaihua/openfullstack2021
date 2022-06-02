import Part from "./Part";

const Content = ({ courses }) => {
  const renderedPart = courses.map((item) => (
    <Part part={item.part} exercises={item.exercises} />
  ));
  return <p>{renderedPart}</p>;
};

export default Content;
