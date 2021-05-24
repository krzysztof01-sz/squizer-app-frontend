import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AccessibleWrapper from '../../AccessibleWrapper';
import Nav from './Nav';
import { navItems } from '../../../utils/constants';
import { UserContext } from '../../../contexts/User';
import Logo from './Logo';
import './styles.scss';

const AuthenticatedHeader = () => {
  return (
    <header className="header">
      <Logo link={'/dashboard'} />
      <Nav navItems={navItems} />
    </header>
  );
};

const UnauthenticatedHeader = () => {
  return (
    <header className="header">
      <Logo link={'/'} />
      <section className="header__actionButtons">
        <AccessibleWrapper>
          <Link to="/login">
            <p className="header__button">Login</p>
          </Link>
        </AccessibleWrapper>
        <AccessibleWrapper>
          <Link to="/signup">
            <p className="header__button">Sign up</p>
          </Link>
        </AccessibleWrapper>
      </section>
    </header>
  );
};

const Header = () => {
  const { user } = useContext(UserContext);
  return user ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

export default Header;
