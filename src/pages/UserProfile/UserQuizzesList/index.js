import { memo } from 'react';
import SectionHeader from '../../../global/Components/SectionHeader';
import UserQuiz from '../UserQuiz';
import './styles.scss';

const UserQuizzesList = ({ userQuizzes }) => {
  return (
    <section role="list" className="userQuizzes">
      <SectionHeader isCenter={true}>Your quizzes</SectionHeader>
      {userQuizzes.map((quiz) => {
        return <UserQuiz key={quiz._id} quizId={quiz._id} />;
      })}
    </section>
  );
};

export default memo(UserQuizzesList);
