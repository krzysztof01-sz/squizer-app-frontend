import './styles.scss';

const AvatarPreview = ({ preview }) => {
  return (
    <div className="avatarPreview">
      {preview ? <img className="avatarPreview__image" src={preview} alt="Avatar" /> : <div className="avatarPreview__image"></div>}
    </div>
  );
};

export default AvatarPreview;
