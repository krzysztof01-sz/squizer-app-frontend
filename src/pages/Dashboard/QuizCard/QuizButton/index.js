import { Link } from 'react-router-dom';
import './styles.scss';

const QuizButton = ({ borderColor, quizId }) => {
  return (
    <Link to={`/quiz/${quizId}/about`}>
      <button className="button quizButton" style={{ border: `3px solid ${borderColor}` }}>
        check
      </button>
    </Link>
  );
};

export default QuizButton;
