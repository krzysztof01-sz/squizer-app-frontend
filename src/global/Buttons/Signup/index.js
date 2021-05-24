import './styles.scss';

const SingupButton = ({ isDisabled }) => {
  return (
    <button className="button signupButton" disabled={isDisabled}>
      Sign up
    </button>
  );
};

export default SingupButton;
