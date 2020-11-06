const LoginButton = ({ isDisabled }) => {
  return isDisabled ? (
    <button className="button loginButton" disabled>
      Login
    </button>
  ) : (
    <button className="button loginButton">Login</button>
  );
};

export default LoginButton;
