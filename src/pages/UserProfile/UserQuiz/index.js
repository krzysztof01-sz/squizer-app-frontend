import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../global/Components/Loader';
import { useQuiz } from '../../../hooks';
import { responseTypes } from '../../../utils/constants';
import { QUIZ_DELETING_CONFIRMATION } from '../../../utils/feedbackMessages';
import { shortenText } from '../../../utils/functions';
import DeleteQuizButton from './DeleteQuizButton';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import * as api from '../../../api';
import './styles.scss';

const UserQuiz = ({ quizId }) => {
  const [deletingResult, setDeletingResult] = useState(null);
  const { quiz, error, loading } = useQuiz(quizId);

  if (loading) return <Loader width={200} height={200} />;
  if (error)
    return (
      <article className="userQuiz">
        <SectionHeader isCenter={true}>Quiz not found</SectionHeader>
      </article>
    );

  return (
    <article role="listitem" className="userQuiz">
      <p className="userQuiz__title">{quiz.title}</p>
      <p className="userQuiz__description">{shortenText(quiz.description, 200)}</p>
      <section className="userQuiz__actionsBar">
        <div className="iconsWrapper">
          <DeleteQuizButton
            callback={async () => {
              if (confirm(QUIZ_DELETING_CONFIRMATION)) {
                const result = await api.deleteQuiz(quizId);
                setDeletingResult(result);

                if (result.type === responseTypes.success) {
                  location.reload();
                }
              }
            }}
          />
        </div>
        <Link to={`/quiz/${quizId}/about`}>
          <button className="button userQuiz__button">check</button>
        </Link>
      </section>

      <ActionResultMessage msg={deletingResult?.msg} type={deletingResult?.type} />
    </article>
  );
};

export default UserQuiz;
