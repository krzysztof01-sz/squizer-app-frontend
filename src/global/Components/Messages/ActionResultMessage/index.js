import './styles.scss';

const ActionResultMessage = ({ msg, type }) => {
  return <p className={`resultMessage resultMessage-${type}`}>{msg}</p>;
};

export default ActionResultMessage;
