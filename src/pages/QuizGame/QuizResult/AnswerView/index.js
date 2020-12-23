import './styles.scss';

const Answer = ({ extraClass = '', content }) => {
  return <section className={`answer__content answerView ${extraClass}`}>{content}</section>;
};

export default Answer;
