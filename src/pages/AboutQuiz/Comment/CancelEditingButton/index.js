import { BinIcon } from '../../../../global/Icons';

const CancelEditingButton = ({ callback }) => {
  return (
    <button onClick={() => callback()} className="button deleteButton">
      Cancel <BinIcon />
    </button>
  );
};

export default CancelEditingButton;
