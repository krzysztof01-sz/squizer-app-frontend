import { useContext } from 'react';
import { FilteringContext } from '../../../contexts/Filtering';
import { UserContext } from '../../../contexts/User';
import LackOfQuizzesView from '../LackOfQuizzesView';
import QuizCard from '../QuizCard';
import './styles.scss';

const QuizzesList = ({ quizzes }) => {
  const { invisibleQuizzesQuantity } = useContext(FilteringContext);
  const { user: me } = useContext(UserContext);

  return (
    <>
      {invisibleQuizzesQuantity === 0 && <LackOfQuizzesView />}
      <section role="list" className="quizzesList">
        {quizzes.map((quiz) => {
          return <QuizCard isVisited={me.visitedQuizzes.includes(quiz._id)} key={quiz._id} quiz={quiz} />;
        })}
      </section>
    </>
  );
};

export default QuizzesList;
