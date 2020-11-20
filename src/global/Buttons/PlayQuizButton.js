import { Link } from 'react-router-dom';

const PlayQuizButton = ({ borderColor, quizId }) => {
  return (
    <Link to={`/quiz/${quizId}/play`}>
      <button className="button" style={{ border: `3px solid ${borderColor}` }}>
        Play
      </button>
    </Link>
  );
};

export default PlayQuizButton;
