import { CameraIcon } from '../../../global/Icons';
import './styles.scss';

const ChangeAvatarButton = () => {
  return (
    <div className="profile__buttonWrapper">
      <p className="profile__button">change</p>
      <span className="iconWrapper">
        <CameraIcon />
      </span>
    </div>
  );
};

export default ChangeAvatarButton;
