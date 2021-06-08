import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import AddCommentButton from './AddCommentButton';
import TextArea from './TextArea';
import CharactersCounter from '../../../global/Components/CharactersCounter';
import { useComment } from '../../../hooks/useComment';

const CommentForm = () => {
  const { quizId } = useParams();
  const [comment, setComment] = useState('');
  const { addComment, isSubmitting, actionResult } = useComment();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(quizId, comment);
      }}
      method="POST"
      className="form commentForm"
    >
      <TextArea comment={comment} setComment={setComment} />
      <CharactersCounter charactersNumber={comment.length} />
      <AddCommentButton isDisabled={isSubmitting} />
      <ActionResultMessage type={actionResult?.type} msg={actionResult?.msg} />
    </form>
  );
};

export default CommentForm;
