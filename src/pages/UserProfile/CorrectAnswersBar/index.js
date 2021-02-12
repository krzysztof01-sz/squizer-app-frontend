import './styles.scss';

const CorrectAnswersBar = ({ percent }) => {
  return (
    <section className="correctAnswersBar">
      <div className="progressBar">{percent}% correct answers</div>
    </section>
  );
};

export default CorrectAnswersBar;
