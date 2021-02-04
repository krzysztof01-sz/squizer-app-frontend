import Comment from '../Comment';
import * as fb from '../../../utils/feedbackMessages';
import './styles.scss';

const CommentsList = ({ comments }) => {
  const commentsExists = comments.length > 0;

  return (
    <section className="commentsList">
      <p className="comments__info">Comments ({comments.length})</p>
      {commentsExists ? (
        comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />;
        })
      ) : (
        <p>{fb.COMMENTS_NOT_FOUND}</p>
      )}
    </section>
  );
};

export default CommentsList;
