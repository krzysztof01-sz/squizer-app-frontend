import { Link } from 'react-router-dom';
import './styles.scss';

const PlayButton = ({ link }) => {
  return (
    <Link to={link}>
      <button className="button quizCard__button">Play!</button>
    </Link>
  );
};

export default PlayButton;
