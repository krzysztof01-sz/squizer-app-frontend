import '../../../styles/global/Buttons/SignupButton.scss';

const SingupButton = ({ isDisabled }) => {
  return isDisabled ? (
    <button className="button signupButton" disabled>
      Sign up
    </button>
  ) : (
    <button tabIndex="-1" className="button signupButton">
      <span role="button" className="signupButton--accessible" aria-controls="filename" tabIndex="0">
        Sign up
      </span>
    </button>
  );
};

export default SingupButton;
