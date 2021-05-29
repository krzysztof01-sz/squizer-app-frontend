import { SaveIcon } from '../../Icons';
import './styles.scss';

const SaveButton = ({ callback }) => {
  return (
    <button className="button saveButton" onClick={callback}>
      Save <SaveIcon />
    </button>
  );
};

export default SaveButton;
