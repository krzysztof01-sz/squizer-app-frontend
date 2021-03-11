import './styles.scss';

const Answer = ({ content, setAnswer, letter }) => {
  return (
    <section
      tabIndex="0"
      className="answer__content"
      name={letter}
      onClick={({ target }) => {
        setAnswer(letter);
        target.classList.add('answer__content--checked');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setAnswer(letter);
          e.target.classList.add('answer__content--checked');
        }
      }}
    >
      {content}
    </section>
  );
};

export default Answer;
