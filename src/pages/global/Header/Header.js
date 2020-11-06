import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} />
      </Link>
    </header>
  );
};

export default Header;
