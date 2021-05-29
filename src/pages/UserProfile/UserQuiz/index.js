import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../global/Components/Loader';
import { responseTypes } from '../../../utils/constants';
import { QUIZ_DELETING_CONFIRMATION } from '../../../utils/feedbackMessages';
import { shortenText } from '../../../utils/functions';
import DeleteButton from '../../../global/Buttons/Delete';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import './styles.scss';
import { useFetching } from '../../../hooks/useFetching';
import { getQuiz } from '../../../api';
import SectionHeader from '../../../global/Components/SectionHeader';
import * as api from '../../../api';

const UserQuiz = ({ quizId }) => {
  const [deletingResult, setDeletingResult] = useState(null);
  const { data: quiz, error, loading } = useFetching(getQuiz, quizId);

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
        <DeleteButton
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
        <Link to={`/quiz/${quizId}/about`}>
          <button className="button userQuiz__checkButton">check</button>
        </Link>
      </section>

      <ActionResultMessage msg={deletingResult?.msg} type={deletingResult?.type} />
    </article>
  );
};

export default UserQuiz;
