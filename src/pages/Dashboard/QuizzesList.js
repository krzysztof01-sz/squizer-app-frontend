import QuizCard from './QuizCard';
import '../../styles/pages/Dashboard/QuizzesList.scss';

const QuizzesList = ({ quizzes }) => {
  return (
    <section className="quizzesList">
      {quizzes.map((quiz, index) => {
        return <QuizCard key={index} quiz={quiz} />;
      })}
    </section>
  );
};

export default QuizzesList;
