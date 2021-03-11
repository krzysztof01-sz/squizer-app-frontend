import { BinIcon } from '../../../../global/Icons';
import './styles.scss';

const DeleteQuizButton = ({ callback }) => {
  return (
    <button aria-label="Delete quiz" className="button deleteQuizButton" onClick={callback}>
      <BinIcon />
    </button>
  );
};

export default DeleteQuizButton;
