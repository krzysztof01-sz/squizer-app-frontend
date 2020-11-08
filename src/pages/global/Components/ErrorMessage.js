import '../../../styles/global/Components/ErrorMessage.scss';

const ErrorMessage = ({ message }) => {
  return <p className="errorMessage">{message}</p>;
};

export default ErrorMessage;
