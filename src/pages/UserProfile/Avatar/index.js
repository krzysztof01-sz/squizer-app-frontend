import Loader from '../../../global/Components/Loader';
import { useUser } from '../../../hooks';
import './styles.scss';

const Avatar = ({ userId }) => {
  const { user } = useUser(userId);
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
