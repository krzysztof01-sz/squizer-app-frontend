import './styles.scss';
import AccessibleWrapper from '../../AccessibleWrapper';

const SingupButton = ({ isDisabled }) => {
  return (
    <AccessibleWrapper>
      <button className="button signupButton" disabled={isDisabled}>
        Sign up
      </button>
    </AccessibleWrapper>
  );
};

export default SingupButton;
