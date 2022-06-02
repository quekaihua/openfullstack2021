import Header from "../header/Header";
import Content from "../content/Content";
import Total from "../total/Total";

const Course = ({ course }) => {
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

export default Course;
