import { Link } from 'react-router-dom';
import Loader from '../../../global/Components/Loader';
import { BinIcon } from '../../../global/Icons';
import { useQuiz } from '../../../hooks';
import { shortenText } from '../../../utils/functions';
import './styles.scss';

const UserQuiz = ({ quizId }) => {
  const { quiz, error, loading } = useQuiz(quizId);

  if (loading) return <Loader width={200} height={200} />;
  if (error)
    return (
      <article className="userQuiz">
        <SectionHeader isCenter={true}>Quiz not found</SectionHeader>
      </article>
    );

  return (
    <article className="userQuiz">
      <p className="userQuiz__title">{quiz.title}</p>
      <p className="userQuiz__description">{shortenText(quiz.description, 200)}</p>
      <section className="userQuiz__actionsBar">
        <div className="iconsWrapper">
          <BinIcon />
        </div>
        <Link to={`/quiz/${quizId}/about`}>
          <button className="button userQuiz__button">check</button>
        </Link>
      </section>
    </article>
  );
};

export default UserQuiz;
