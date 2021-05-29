import { UpdateIcon } from '../../Icons';
import './styles.scss';

const UpdateButton = ({ callback, isDisabled }) => {
  return (
    <button disabled={isDisabled} aria-label="Update" className="button updateButton" onClick={callback}>
      Update <UpdateIcon />
    </button>
  );
};

export default UpdateButton;
