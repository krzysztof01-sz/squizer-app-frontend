import './styles.scss';

const LoginButton = ({ isDisabled }) => {
  return isDisabled ? (
    <button className="button loginButton" disabled>
      Login
    </button>
  ) : (
    <button tabIndex="-1" className="button loginButton">
      <span role="button" className="loginButton--accessible" aria-controls="filename" tabIndex="0">
        Login
      </span>
    </button>
  );
};

export default LoginButton;
