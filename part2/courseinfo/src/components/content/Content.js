import Part from "./Part";

const Content = ({ courses }) => {
  const renderedPart = courses.map((item) => (
    <Part part={item.name} key={item.id} exercises={item.exercises} />
  ));
  return <div>{renderedPart}</div>;
};

export default Content;
