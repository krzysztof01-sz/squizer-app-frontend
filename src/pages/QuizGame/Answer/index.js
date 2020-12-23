import './styles.scss';

const Answer = ({ content, setAnswer, letter }) => {
  return (
    <section
      className="answer__content"
      name={letter}
      onClick={({ target }) => {
        setAnswer(letter);
        target.classList.add('answer__content--checked');
      }}
    >
      {content}
    </section>
  );
};

export default Answer;
