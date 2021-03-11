import { Link } from 'react-router-dom';
import AccessibleWrapper from '../../../AccessibleWrapper';
import LogoutButton from '../../../Buttons/Logout';
import './styles.scss';

const HeaderNav = ({ navItems }) => {
  return (
    <>
      <nav className="header__nav" aria-label="Navigation">
        <ul role="list" className="nav__list">
          {navItems.map(({ route, text }) => {
            return (
              <AccessibleWrapper key={text}>
                <Link to={route}>
                  <li role="listitem" className="nav__item">
                    {text}
                  </li>
                </Link>
              </AccessibleWrapper>
            );
          })}
        </ul>
      </nav>
      <LogoutButton />
    </>
  );
};

export default HeaderNav;
