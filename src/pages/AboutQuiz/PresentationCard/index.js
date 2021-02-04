import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/functions';
import PlayButton from './PlayButton';
import './styles.scss';

const PresentationCard = ({ card: { quiz, user, categoryImage } }) => {
  const { quizId } = useParams();

  const backgroundStyles = {
    backgroundImage: `url(${categoryImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100vw 100vh',
  };

  return (
    <div style={{ ...backgroundStyles }} className="background">
      <section className="quizCard__wrapper">
        <article className="quizCard">
          <div className="imageAndAvatarWrapper">
            <img className="quizCard__categoryImage" src={categoryImage} alt={quiz.category} />
            <img className="quizCard__avatar" src={user.avatar} alt={user.nickname} />
          </div>
          <p className="quizCard__title">{quiz.title}</p>
          <p className="quizCard__description">{quiz.description}</p>
          <div className="buttonAndInfoWrapper">
            <PlayButton link={`/quiz/${quizId}/play`} />
            <div className="infoWrapper">
              <p className="quizCard__author">author: {user.nickname}</p>
              <p className="quizCard__creationDate">created in: {formatDate(quiz.creationDate)}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default PresentationCard;