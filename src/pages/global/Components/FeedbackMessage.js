import '../../../styles/global/Components/FeedbackMessage.scss';

const FeedbackMessage = ({ message, type }) => {
  return (
    <p className={`feedbackMessage--${type}`}>
      {type} {message}
    </p>
  );
};

export default FeedbackMessage;
