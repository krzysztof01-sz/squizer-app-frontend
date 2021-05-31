import { SendIcon } from '../../../../global/Icons';
import './styles.scss';

const SendButton = ({ callback, isDisabled }) => {
  return (
    <button disabled={isDisabled} onClick={callback} className="button send__button">
      Send <SendIcon />
    </button>
  );
};

export default SendButton;
