import { StarIcon } from '../../../../global/Icons';
import './styles.scss';

const Star = ({ isLight, callback }) => {
  return (
    <div onClick={callback} className={`starWrapper ${isLight ? 'starWrapper--light' : ''}`}>
      <StarIcon />
    </div>
  );
};

export default Star;
