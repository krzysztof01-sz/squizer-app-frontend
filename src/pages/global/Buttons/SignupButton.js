const SingupButton = ({ isDisabled }) => {
  return isDisabled ? (
    <button className="button signupButton" disabled>
      Sign up
    </button>
  ) : (
    <button className="button signupButton">Sign up</button>
  );
};

export default SingupButton;
