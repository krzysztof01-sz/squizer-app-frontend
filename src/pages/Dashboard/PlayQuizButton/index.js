import { Link } from 'react-router-dom';
import './styles.scss';

const PlayQuizButton = ({ borderColor, quizId }) => {
  return (
    <Link to={`/quiz/${quizId}/play`}>
      <button className="button playQuizButton" style={{ border: `3px solid ${borderColor}` }}>
        Play
      </button>
    </Link>
  );
};

export default PlayQuizButton;
