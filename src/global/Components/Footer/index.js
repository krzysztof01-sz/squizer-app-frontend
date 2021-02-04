import { memo } from 'react';
import { getCurrentYear } from '../../../utils/functions';
import './styles.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">Krzysztof Szczepański - All rights reserved {getCurrentYear()}</p>
    </footer>
  );
};

export default memo(Footer);
