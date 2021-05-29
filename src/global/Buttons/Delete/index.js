import { BinIcon } from '../../Icons';
import './styles.scss';

const DeleteButton = ({ callback }) => {
  return (
    <button aria-label="Delete" className="button deleteButton" onClick={callback}>
      Delete <BinIcon />
    </button>
  );
};

export default DeleteButton;
