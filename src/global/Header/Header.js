import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg';
import '../../styles/global/Components/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Link tabIndex="-1" to="/">
        <img className="header__logo" src={Logo} />
      </Link>
    </header>
  );
};

export default Header;
