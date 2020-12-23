import './styles.scss';

const SwitchDot = ({ callback, filled }) => {
  return <div onClick={callback} className={`dot ${filled ? 'dot--filled' : ''}`}></div>;
};

export default SwitchDot;
