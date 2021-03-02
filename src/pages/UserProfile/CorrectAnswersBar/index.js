import { useEffect } from 'react';
import './styles.scss';

const CorrectAnswersBar = ({ percent }) => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.correctAnswersBar').classList.add('animate');
      document.querySelector('.progressBar').classList.add('animate');
    }, 500);
  });

  return (
    <section className="correctAnswersBar">
      <div className="progressBar" style={{ width: `${percent}%` }}>
        <p className="progressBar__percentage">{percent}% correct answers</p>
      </div>
    </section>
  );
};

export default CorrectAnswersBar;
