import { Link } from 'react-router-dom';
import './styles.scss';

const HeaderLoginButton = () => {
  return (
    <Link to="/login">
      <p className="header__loginButton">Login</p>
    </Link>
  );
};

export default HeaderLoginButton;
