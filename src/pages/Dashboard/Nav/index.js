import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronIcon } from '../../../global/Icons';
import './styles.scss';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <header onClick={() => setIsOpen(!isOpen)} className="nav__header">
        menu <ChevronIcon />
      </header>
      <ul className="nav__list" style={{ display: `${isOpen ? 'block' : 'none'}` }}>
        <Link to="/quizform">
          <li className="nav__item">add a new quiz</li>
        </Link>
        <li className="nav__item">user profile</li>
        <li className="nav__item">about</li>
      </ul>
    </nav>
  );
};

export default Nav;
