import './styles.scss';
import AccessibleWrapper from '../../AccessibleWrapper';

const LoginButton = ({ isDisabled }) => {
  return (
    <AccessibleWrapper>
      <button className="button loginButton" disabled={isDisabled}>
        Login
      </button>
    </AccessibleWrapper>
  );
};

export default LoginButton;
