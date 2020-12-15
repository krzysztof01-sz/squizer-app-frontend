import { useState } from 'react';

import { ChevronIcon } from '../../../global/Icons/icons';
import './styles.scss';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navigation">
      <header onClick={() => setIsOpen(!isOpen)} className="navigation__header">
        menu <ChevronIcon />
      </header>
      <ul className="navigation__list" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
        <li className="navigation__item">add a new quiz</li>
        <li className="navigation__item">user profile</li>
        <li className="navigation__item">about</li>
      </ul>
    </nav>
  );
};

export default Nav;
