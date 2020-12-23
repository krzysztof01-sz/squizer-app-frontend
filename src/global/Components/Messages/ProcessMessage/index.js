import { memo } from 'react';

const ProcessMessage = ({ message }) => {
  return <p className="processMessage">{message}</p>;
};

export default memo(ProcessMessage);
