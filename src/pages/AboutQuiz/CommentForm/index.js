import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import * as api from '../../../api';
import AddCommentButton from './AddCommentButton';
import TextArea from './TextArea';
import CharactersCounter from './CharactersCounter';

const CommentForm = () => {
  const { quizId } = useParams();
  const [comment, setComment] = useState('');
  const [result, setResult] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await api.addComment({ content: comment, quizId });
        setIsSubmitting(false);
        setComment('');
        setResult(result);
        location.reload();
      }}
      method="POST"
      className="form commentForm"
    >
      <TextArea comment={comment} setComment={setComment} />
      <CharactersCounter charactersNumber={comment.length} />
      <AddCommentButton disabled={isSubmitting} />

      <ActionResultMessage type={result?.type} msg={result?.msg} />
    </form>
  );
};

export default CommentForm;
