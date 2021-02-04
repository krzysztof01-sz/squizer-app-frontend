import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import { AuthContext } from '../../../contexts/Auth';
import LogoutButton from '../../Buttons/Logout';
import HeaderLoginButton from './LoginButton';
import './styles.scss';

const Header = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <header className="header">
      <Link tabIndex="-1" to={isLogged ? '/dashboard' : '/'}>
        <img className="header__logo" src={Logo} alt="logo" />
      </Link>
      {isLogged ? (
        <>
          <nav className="header__nav">
            <ul className="nav__list">
              <Link to="/quizform">
                <li className="nav__item">add a new quiz</li>
              </Link>
              <li className="nav__item">user profile</li>
              <li className="nav__item">about</li>
            </ul>
          </nav>
          <LogoutButton />
        </>
      ) : (
        <HeaderLoginButton />
      )}
    </header>
  );
};

export default Header;
