import { memo } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import '../../styles/global/Components/Header.scss';
import LogoutButton from '../Buttons/LogoutButton';

const Header = ({ isLogged = false }) => {
  return (
    <header className="header">
      <Link tabIndex="-1" to="/">
        <img className="header__logo" src={Logo} />
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
      ) : null}
    </header>
  );
};

export default memo(Header);
