import SectionHeader from '../../../global/Components/SectionHeader';
import UserQuiz from '../UserQuiz';
import './styles.scss';

const UserQuizzesList = ({ userQuizzes }) => {
  return (
    <section className="userQuizzes">
      <SectionHeader>Your quizzes</SectionHeader>
      <UserQuiz />
      <UserQuiz />
      <UserQuiz />
      <UserQuiz />
      <UserQuiz />
    </section>
  );
};

export default UserQuizzesList;
