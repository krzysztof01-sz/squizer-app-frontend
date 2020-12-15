import './styles.scss';

const QuestionDot = ({ setQuestionID, filled }) => {
  return <div onClick={setQuestionID} className={`${filled ? 'dot--filled' : 'dot'}`}></div>;
};

export default QuestionDot;
