import { memo } from 'react';
import Loader from '../../../global/Components/Loader';
import { useUser } from '../../../hooks/useUser';
import { formatDate } from '../../../utils/functions';
import './styles.scss';

const Comment = ({ comment: { _id, authorId, content, creationDate } }) => {
  const { user } = useUser(authorId);

  return user ? (
    <article className="comment" key={_id}>
      <div role="contentinfo" className="commentInfo">
        <img className="comment__avatar" src={user.avatar} alt={`${user.nickname} avatar`} />
        <p className="comment__author">{user.nickname}</p>
        <p className="comment__date">{formatDate(creationDate)}</p>
      </div>
      <p className="comment__description">{content}</p>
    </article>
  ) : (
    <Loader width={40} height={40} />
  );
};

export default memo(Comment);
