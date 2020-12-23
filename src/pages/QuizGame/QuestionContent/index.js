import './styles.scss';

const QuestionContent = ({ questionID, content }) => {
  return (
    <p data-questionid={questionID + 1} className="question__content">
      {content}
    </p>
  );
};

export default QuestionContent;
