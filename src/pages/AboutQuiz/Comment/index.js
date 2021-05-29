import { memo, useContext, useState } from 'react';
import { getUser } from '../../../api';
import Loader from '../../../global/Components/Loader';
import { useFetching } from '../../../hooks/useFetching';
import { formatDate } from '../../../utils/functions';
import { UserContext } from '../../../contexts/User';
import DeleteButton from '../../../global/Buttons/Delete';
import UpdateButton from '../../../global/Buttons/Update';
import { useParams } from 'react-router';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import TextArea from '../CommentForm/TextArea';
import SaveButton from '../../../global/Buttons/SaveButton';
import CharactersCounter from '../CommentForm/CharactersCounter';
import CancelEditingButton from './CancelEditingButton';
import { useComment } from '../../../hooks/useComment';
import './styles.scss';

const Comment = ({ comment: { _id: commentId, authorId, content, creationDate } }) => {
  const { data: user } = useFetching(getUser, authorId);
  const { user: currentUser } = useContext(UserContext);
  const { quizId } = useParams();
  const [isUpdatingMode, setIsUpdatingMode] = useState(false);
  const [comment, setComment] = useState('');
  const { updateComment, deleteComment, actionResult, isSubmitting } = useComment();

  return user ? (
    <article className="comment" key={commentId}>
      <div role="contentinfo" className="commentInfo">
        <img className="comment__avatar" src={user.avatar} alt={`${user.nickname} avatar`} />
        <p className="comment__author">{user.nickname}</p>
        <p className="comment__date">{formatDate(creationDate)}</p>
      </div>
      {isUpdatingMode ? (
        <>
          <TextArea comment={comment} setComment={setComment} />
          <CharactersCounter charactersNumber={comment.length} />
          <section className="comment__actionButtonsWrapper">
            <SaveButton callback={() => updateComment(quizId, commentId, comment)} />
            <CancelEditingButton callback={() => setIsUpdatingMode(false)} />
          </section>
          <ActionResultMessage type={actionResult?.type} msg={actionResult?.msg} />
        </>
      ) : (
        <p className="comment__description">{content}</p>
      )}
      {authorId === currentUser._id && !isUpdatingMode ? (
        <>
          <section className="comment__actionButtonsWrapper">
            <UpdateButton
              isDisabled={isSubmitting}
              callback={() => {
                setComment(content);
                setIsUpdatingMode(true);
              }}
            />
            <DeleteButton callback={() => deleteComment(quizId, commentId)} />
          </section>
          <ActionResultMessage type={actionResult?.type} msg={actionResult?.msg} />
        </>
      ) : null}
    </article>
  ) : (
    <Loader width={40} height={40} />
  );
};

export default memo(Comment);
