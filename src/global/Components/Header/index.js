import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import AccessibleWrapper from '../../AccessibleWrapper';
import Nav from './Nav';
import HeaderButton from '../../Buttons/HeaderButton';
import { navItems } from '../../../utils/constants';
import { UserContext } from '../../../contexts/User';
import './styles.scss';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <AccessibleWrapper>
        <Link to={user ? '/dashboard' : '/'}>
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
      </AccessibleWrapper>
      {user ? (
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
