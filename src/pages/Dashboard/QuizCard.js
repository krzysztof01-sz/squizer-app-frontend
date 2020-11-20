import { useEffect, useState } from 'react';
import * as api from '../../api/userAPI';
import DefaultPhoto from '../../assets/images/DefaultPhoto.png';
import PlayQuizButton from '../../global/Buttons/PlayQuizButton';
import '../../styles/pages/Dashboard/QuizCard.scss';
import QuizCreationDate from './QuizCreationDate';
import QuizDescription from './QuizDescription';
import QuizTitle from './QuizTitle';
import UserPhoto from './UserPhoto';

const QuizCard = ({ quiz: { _id, title, description, creationDate, createdBy, cathegory, cathegoryColor } }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userNick, setUserNick] = useState('');
  const [cathegoryImage, setCathegoryImage] = useState('');

  useEffect(() => {
    const getUserPhoto = async () => {
      const user = await api.getUserById(createdBy);
      setUserNick(user?.nickname);

      const photoType = user?.photoType || 'default';
      if (photoType === 'default') {
        setUserPhoto(DefaultPhoto);
      } else {
        const photoLink = await api.getUserPhoto(createdBy);
        setUserPhoto(photoLink);
      }
    };
    getUserPhoto();
  }, []);

  useEffect(() => {
    const getCathegoryImage = async (moduleName) => {
      const { default: image } = await import(`../../assets/images/cathegories/${moduleName}.png`);
      setCathegoryImage(image);
    };
    getCathegoryImage(cathegory);
  }, []);

  return (
    <article className="quizCard" style={{ borderBottom: `10px solid ${cathegoryColor}` }}>
      <div className="quizCard__cathegoryImageWrapper">
        <img className="quizCard__cathegoryImage" src={cathegoryImage} />
        <UserPhoto src={userPhoto} />
        <p className="quizCard__authorNick">author: {userNick}</p>
      </div>
      <div className="quizCard__info">
        <QuizTitle title={title} />
        <QuizDescription description={description} />
        <div className="buttonWrapper">
          <PlayQuizButton borderColor={cathegoryColor} quizId={_id} />
          <QuizCreationDate creationDate={creationDate} />
        </div>
      </div>
      <br />
    </article>
  );
};

export default QuizCard;
