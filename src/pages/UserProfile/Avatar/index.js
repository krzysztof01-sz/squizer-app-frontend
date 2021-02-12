import './styles.scss';

const Avatar = ({ src }) => {
  return <img className="profile__avatar" alt="user avatar" src={src} />;
};

export default Avatar;
