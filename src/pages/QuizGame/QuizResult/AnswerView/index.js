import './styles.scss';

const Answer = ({ extraClass = '', content }) => {
  return (
    <section
      tabIndex="0"
      aria-label={extraClass}
      className={`answer__content answerView ${extraClass}`}
    >
      {content}
    </section>
  );
};

export default Answer;
