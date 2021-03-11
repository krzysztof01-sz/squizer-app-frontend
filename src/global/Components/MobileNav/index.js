import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronIcon } from '../../Icons';
import './styles.scss';

const MobileNav = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mobileNav" aria-label="Navigation">
      <header onClick={() => setIsOpen(!isOpen)} className="mobileNav__header">
        menu <ChevronIcon />
      </header>
      <ul className="mobileNav__list" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
        {navItems.map(({ route, text }) => {
          return (
            <Link key={text} to={route}>
              <li className="mobileNav__item">{text}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileNav;
