import QuizButton from './QuizButton';
import { categoryToColor as map, maxDescriptionLengthOnCard, maxTitleLengthOnCard } from '../../../utils/constants';
import { formatDate, shortenText } from '../../../utils/functions';
import { useCategoryImage } from '../../../hooks/useCategoryImage';
import { memo } from 'react';
import { useFetching } from '../../../hooks/useFetching';
import { getUser } from '../../../api';
import { Skeleton } from '@material-ui/lab';
import './styles.scss';
import { CheckIcon } from '../../../global/Icons';

const QuizCard = ({ isVisited, quiz: { _id, title, description, creationDate, createdBy, category } }) => {
  const { categoryImage } = useCategoryImage(category);
  const { data: user } = useFetching(getUser, createdBy);

  return user && categoryImage ? (
    <article role="listitem" className="quizCard" style={{ borderBottom: `10px solid ${map.get(category)}` }}>
      {isVisited && (
        <div className="quizCard__badge">
          Visited <CheckIcon />
        </div>
      )}
      <div className="quizCard__categoryImageWrapper">
        <img className="quizCard__categoryImage" src={categoryImage} alt={category} />
        <img className="quizCard__avatar" src={user.avatar} alt={`${user.nickname} avatar`} />
      </div>
      <div role="contentinfo" className="quizCard__info">
        <p className="quizCard__title">{shortenText(title, maxTitleLengthOnCard)}</p>
        <p className="quizCard__description">{shortenText(description, maxDescriptionLengthOnCard)}</p>
        <div className="quizCard__buttonAndDateWrapper">
          <QuizButton borderColor={map.get(category)} quizId={_id} />
          <p className="quizCard__creationDate">{formatDate(creationDate)}</p>
        </div>
      </div>
      <br />
    </article>
  ) : (
    <article className="quizCard">
      <Skeleton variant="rect" className="quizCard__categoryImageWrapper" />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </article>
  );
};

export default memo(QuizCard);
