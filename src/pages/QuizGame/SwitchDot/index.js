import AccessibleWrapper from '../../../global/AccessibleWrapper';
import './styles.scss';

const SwitchDot = ({ callback, filled }) => {
  return (
    <AccessibleWrapper>
      <div onClick={callback} className={`dot ${filled ? 'dot--filled' : ''}`}></div>
    </AccessibleWrapper>
  );
};

export default SwitchDot;
