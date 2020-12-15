import QuizCard from '../QuizCard/index';
import './styles.scss';

const QuizzesList = ({ quizzes }) => {
  return (
    <section className="quizzesList">
      {quizzes.map((quiz) => {
        return <QuizCard key={quiz._id} quiz={quiz} />;
      })}
    </section>
  );
};

export default QuizzesList;
