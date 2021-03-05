import { useEffect } from 'react';
import './styles.scss';

const formatPercentage = (givenAnswers, correctAnswers) =>
  correctAnswers !== 0 ? ((correctAnswers / givenAnswers) * 100).toFixed(2) : 0;

const CorrectAnswersBar = ({ givenAnswersQuantity, correctAnswersQuantity }) => {
  const percentage = formatPercentage(givenAnswersQuantity, correctAnswersQuantity);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.correctAnswersBar').classList.add('animate');
      document.querySelector('.progressBar').classList.add('animate');
    }, 500);
  });

  return (
    <section className="correctAnswersBar">
      <div className="progressBar" style={{ width: `${percentage}%` }}>
        <p className="progressBar__percentage">{percentage}% correct answers</p>
      </div>
    </section>
  );
};

export default CorrectAnswersBar;
