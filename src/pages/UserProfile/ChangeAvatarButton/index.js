import { CameraIcon } from '../../../global/Icons';
import './styles.scss';

const ChangeAvatarButton = ({ onClickCallback }) => {
  return (
    <div onClick={onClickCallback} className="changeAvatarButton__wrapper">
      <p className="changeAvatarButton">change</p>
      <span className="changeAvatarButton__icon">
        <CameraIcon />
      </span>
    </div>
  );
};

export default ChangeAvatarButton;
