import './styles.scss';

const SingupButton = ({ isDisabled }) => {
  return (
    <button tabIndex="-1" className="button signupButton" disabled={isDisabled ? true : false}>
      <span role="button" className="signupButton--accessible" aria-controls="filename" tabIndex="0">
        Sign up
      </span>
    </button>
  );
};

export default SingupButton;
