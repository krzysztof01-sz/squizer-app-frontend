import { getUser } from '../../../api';
import Loader from '../../../global/Components/Loader';
import { useFetching } from '../../../hooks/useFetching';
import './styles.scss';

const Avatar = ({ userId }) => {
  const { data: user } = useFetching(getUser, userId);

  if (user) {
    return <img className="profile__avatar" alt={`user ${user.avatar} avatar`} src={user.avatar} />;
  } else {
    return (
      <div className="profile__avatar">
        <Loader width={200} height={200} />
      </div>
    );
  }
};

export default Avatar;
