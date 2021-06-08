import { memo } from 'react';
import { useParams } from 'react-router-dom';
import AccessibleWrapper from '../../../global/AccessibleWrapper';
import { formatDate, getStarsRenderingOrder } from '../../../utils/functions';
import Star from '../../QuizGame/RatingCard/Star';
import PlayButton from './PlayButton';
import './styles.scss';

const getRatingValues = (ratings) => ratings.map(({ rating }) => rating);
const getAverage = (values) => values.reduce((prev, acc) => prev + acc, 0);

const getAverageRating = (ratings) => {
  if (ratings.length === 0) return 0;

  const ratingValues = getRatingValues(ratings);
  const average = getAverage(ratingValues);
  return (average / ratings.length).toFixed(2);
};

const PresentationCard = ({ card: { quiz, user, categoryImage } }) => {
  const { quizId } = useParams();
  const quizRating = getAverageRating(quiz.ratings);

  const backgroundStyles = {
    backgroundImage: `url(${categoryImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100vw 120vh',
  };

  return (
    <div style={{ ...backgroundStyles }} className="background">
      <section className="quizCard__wrapper">
        <article className="quizCard">
          <div className="imageAndAvatarWrapper">
            <img className="quizCard__categoryImage" src={categoryImage} alt={quiz.category} />
            <img className="quizCard__avatar" src={user.avatar} alt={user.nickname} />
          </div>
          <h1 className="quizCard__title">{quiz.title}</h1>
          <p className="quizCard__description">{quiz.description}</p>
          <p>
            Average: {quizRating}, rating(s): {quiz.ratings.length}
          </p>
          <section className="quizCard__starsWrapper">
            {getStarsRenderingOrder(quizRating).map(({ isLightStar: isLight, id }) => (
              <Star isLight={isLight} key={id} callback={() => false} />
            ))}
          </section>
          <div className="buttonAndInfoWrapper">
            <PlayButton link={`/quiz/${quizId}/play`} />
            <div className="infoWrapper">
              <p className="quizCard__author">author: {user.nickname}</p>
              <p className="quizCard__category">category: {quiz.category}</p>
              <p className="quizCard__creationDate">created in: {formatDate(quiz.creationDate)}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default memo(PresentationCard);
