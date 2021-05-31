import AccessibleWrapper from '../../../../global/AccessibleWrapper';
import { StarIcon } from '../../../../global/Icons';
import './styles.scss';

const Star = ({ isLight, callback }) => {
  return (
    <AccessibleWrapper>
      <div onClick={callback} className={`starWrapper ${isLight ? 'starWrapper--light' : ''}`}>
        <StarIcon />
      </div>
    </AccessibleWrapper>
  );
};

export default Star;
