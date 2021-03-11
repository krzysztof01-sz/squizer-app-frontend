import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronIcon } from '../../../global/Icons';
import './styles.scss';

const Nav = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Navigation">
      <header onClick={() => setIsOpen(!isOpen)} className="nav__header">
        menu <ChevronIcon />
      </header>
      <ul className="nav__list" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
        {navItems.map(({ route, text }) => {
          return (
            <Link key={text} to={route}>
              <li className="nav__item">{text}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
