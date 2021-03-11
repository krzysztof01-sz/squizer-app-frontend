import { useContext } from 'react';
import { FilteringContext } from '../../../contexts/Filtering';
import LackOfQuizzesView from '../LackOfQuizzesView';
import QuizCard from '../QuizCard';
import './styles.scss';

const QuizzesList = ({ quizzes }) => {
  const { invisibleQuizzesQuantity } = useContext(FilteringContext);
  return (
    <>
      {invisibleQuizzesQuantity === 0 ? <LackOfQuizzesView /> : null}
      <section role="list" className="quizzesList">
        {quizzes.map((quiz) => {
          return <QuizCard key={quiz._id} quiz={quiz} />;
        })}
      </section>
    </>
  );
};

export default QuizzesList;
