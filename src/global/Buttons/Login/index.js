import './styles.scss';

const LoginButton = ({ isDisabled }) => {
  return (
    <button className="button loginButton" disabled={isDisabled}>
      Login
    </button>
  );
};

export default LoginButton;
