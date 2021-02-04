import Loader from '../../../global/Components/Loader';
import { useUser } from '../../../hooks';
import { formatDate } from '../../../utils/functions';
import './styles.scss';

const Comment = ({ comment: { _id, authorId, content, creationDate } }) => {
  const { user } = useUser(authorId);

  return user ? (
    <article className="comment" key={_id}>
      <div className="commentInfo">
        <img className="comment__avatar" src={user.avatar} />
        <p className="comment__author">{user.nickname}</p>
        <p className="comment__date">{formatDate(creationDate)}</p>
      </div>
      <p className="comment__description">{content}</p>
    </article>
  ) : (
    <Loader />
  );
};

export default Comment;