import { useEffect, useState } from 'react';
import * as api from '../../../api/index';
import DefaultPhoto from '../../../assets/images/DefaultPhoto.png';
import PlayQuizButton from '../PlayQuizButton/index';
import { categoryToColor as map, responseTypes } from '../../../utils/constants';
import { formatDate } from '../../../utils/functions';
import Loader from '../../../global/Components/Loader';
import './styles.scss';

const QuizCard = ({ quiz: { _id, title, description, creationDate, createdBy, category } }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userNick, setUserNick] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    const getUserPhoto = async () => {
      const response = await api.getUserById(createdBy);
      const { type } = response;
      if (type === responseTypes.success) {
        const { user } = response;
        setUserNick(user.nickname);
        if (user.photoType === 'custom') {
          const photoLink = await api.getUserPhoto(createdBy);
          setUserPhoto(photoLink);
        } else setUserPhoto(DefaultPhoto);
      } else {
        setUserNick('');
        setUserPhoto(DefaultPhoto);
      }
    };
    getUserPhoto();
  }, []);

  useEffect(() => {
    const getCategoryImage = async (moduleName) => {
      const { default: image } = await import(`../../../assets/images/categories/${moduleName}.png`);
      setCategoryImage(image);
    };
    getCategoryImage(category);
  }, []);

  const renderUserPhoto = () => {
    return userPhoto ? (
      <img className="quizCard__userPhoto" src={userPhoto} />
    ) : (
      <div className="quizCard__userPhoto">
        <Loader width={40} height={40} />
      </div>
    );
  };

  return (
    <article className="quizCard" style={{ borderBottom: `10px solid ${map.get(category)}` }}>
      <div className="quizCard__categoryImageWrapper">
        <img className="quizCard__categoryImage" src={categoryImage} />
        {renderUserPhoto()}
        <p className="quizCard__authorNick">author: {userNick}</p>
      </div>
      <div className="quizCard__info">
        <p className="quizCard__title">{title}</p>
        <p className="quizCard__description">{description}</p>
        <div className="quizCard__buttonAndDateWrapper">
          <PlayQuizButton borderColor={map.get(category)} quizId={_id} />
          <p className="quizCard__creationDate">{formatDate(creationDate)}</p>
        </div>
      </div>
      <br />
    </article>
  );
};

export default QuizCard;
