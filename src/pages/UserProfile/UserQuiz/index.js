import { BinIcon, EditIcon } from '../../../global/Icons';
import './styles.scss';

const UserQuiz = () => {
  return (
    <article className="userQuiz">
      <p className="userQuiz__title">Linear function - advanced</p>
      <p className="userQuiz__description">
        Do you really know you does internet and computer networks works?
      </p>
      <section className="userQuiz__actionsBar">
        <div className="iconsWrapper">
          <EditIcon />
          <BinIcon />
        </div>
        <button className="button userQuiz__button">check</button>
      </section>
    </article>
  );
};

export default UserQuiz;
