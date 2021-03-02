import { CheckIcon } from '../../../global/Icons';
import './styles.scss';

const SetAvatarButton = ({ callback }) => {
  return (
    <button className="button setAvatarButton" onClick={callback}>
      Set <CheckIcon />
    </button>
  );
};

export default SetAvatarButton;
