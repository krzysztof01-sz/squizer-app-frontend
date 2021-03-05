import QuizButton from './QuizButton';
import { categoryToColor as map, maxDescrptionLengthOnCard } from '../../../utils/constants';
import { formatDate, shortenText } from '../../../utils/functions';
import { useCategoryImage, useUser } from '../../../hooks';
import Loader from '../../../global/Components/Loader';
import './styles.scss';

const QuizCard = ({ quiz: { _id, title, description, creationDate, createdBy, category } }) => {
  const { categoryImage } = useCategoryImage(category);
  const { user } = useUser(createdBy);

  return user && categoryImage ? (
    <article className="quizCard" style={{ borderBottom: `10px solid ${map.get(category)}` }}>
      <div className="quizCard__categoryImageWrapper">
        <img className="quizCard__categoryImage" src={categoryImage} alt={category} />
        <img className="quizCard__avatar" src={user.avatar} alt={user.nickname} />
      </div>
      <div className="quizCard__info">
        <p className="quizCard__title">{title}</p>
        <p className="quizCard__description">
          {shortenText(description, maxDescrptionLengthOnCard)}
        </p>
        <div className="quizCard__buttonAndDateWrapper">
          <QuizButton borderColor={map.get(category)} quizId={_id} />
          <p className="quizCard__creationDate">{formatDate(creationDate)}</p>
        </div>
      </div>
      <br />
    </article>
  ) : (
    <article className="quizCard">
      <Loader width={300} height={300} />
    </article>
  );
};

export default QuizCard;
