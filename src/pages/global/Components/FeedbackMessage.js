const FeedbackMessage = ({ message, type }) => {
  return type === 'success' ? (
    <p className="feedbackMessage">positive :D {message}</p>
  ) : (
    <p className="feedbackMessage">negative {message}</p>
  );
};

export default FeedbackMessage;
