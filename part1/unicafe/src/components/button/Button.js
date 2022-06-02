const Button = ({ feedback, setFeedback }) => {
  return <button onClick={setFeedback}>{feedback}</button>;
};

export default Button;
