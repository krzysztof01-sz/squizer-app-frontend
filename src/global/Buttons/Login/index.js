import './styles.scss';

const LoginButton = ({ isDisabled }) => {
  return (
    <button tabIndex="-1" className="button loginButton" disabled={isDisabled ? true : false}>
      <span role="button" className="loginButton--accessible" aria-controls="filename" tabIndex="0">
        Login
      </span>
    </button>
  );
};

export default LoginButton;
