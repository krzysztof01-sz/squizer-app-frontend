import './styles.scss';

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
          target.classList.add('answer__content--checked');
        }
      }}
      className="answer__content"
    >
      {content}
    </p>
  );
};

export default Answer;
