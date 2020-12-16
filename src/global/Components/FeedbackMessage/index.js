import './styles.scss';

const FeedbackMessage = ({ message, type }) => {
  return <p className={`feedbackMessage feedbackMessage--${type}`}>{message}</p>;
};

export default FeedbackMessage;
