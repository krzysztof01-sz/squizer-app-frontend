import ErrorImg from '../../../assets/images/Resource-not-found.svg';
import './styles.scss';

const LackOfQuizzesView = () => {
  return (
    <section className="lackOfQuizzes">
      <p className="lackOfQuizzes__message">There is no such a quiz 🙁</p>
      <img alt="Lack of quizzes" className="lackOfQuizzes__image" src={ErrorImg} />
    </section>
  );
};

export default LackOfQuizzesView;
