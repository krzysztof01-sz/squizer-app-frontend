import '../../styles/pages/Quiz_Game/Answer.scss';

const Answer = ({ content, setAnswer, letter, borderBottomColor = null }) => {
  return (
    <p
      style={
        borderBottomColor
          ? { borderBottom: `4px solid ${borderBottomColor}`, backgroundColor: borderBottomColor }
          : null
      }
      name={letter}
      onClick={({ target }) => {
        if (typeof setAnswer === 'function') {
          setAnswer(letter);
          target.classList.add('question__answer--checked');
        }
      }}
      className="question__answer"
    >
      {content}
    </p>
  );
};

export default Answer;
