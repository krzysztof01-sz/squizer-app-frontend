import { CameraIcon } from '../../../global/Icons';
import './styles.scss';

const ChangeAvatarButton = ({ onClickCallback }) => {
  return (
    <button onClick={onClickCallback} className="button changeAvatarButton__wrapper">
      <p className="changeAvatarButton">change</p>
      <span role="button" className="changeAvatarButton__icon">
        <CameraIcon />
      </span>
    </button>
  );
};

export default ChangeAvatarButton;
