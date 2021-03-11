import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import AccessibleWrapper from '../../AccessibleWrapper';
import Nav from './Nav';
import HeaderButton from '../../Buttons/HeaderButton';
import { AuthContext } from '../../../contexts/Auth';
import { navItems } from '../../../utils/constants';
import './styles.scss';

const Header = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <header className="header">
      <AccessibleWrapper>
        <Link to={isLogged ? '/dashboard' : '/'}>
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
      </AccessibleWrapper>
      {isLogged ? (
        <Nav navItems={navItems} />
      ) : (
        <section className="header__actionButtons">
          <HeaderButton>
            <Link to="/login">
              <p className="header__button">Login</p>
            </Link>
          </HeaderButton>
          <HeaderButton>
            <Link to="/signup">
              <p className="header__button">Sign up</p>
            </Link>
          </HeaderButton>
        </section>
      )}
    </header>
  );
};

export default Header;
