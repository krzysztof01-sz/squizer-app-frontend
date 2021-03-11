import { getCurrentYear } from '../../../utils/functions';
import './styles.scss';

const Footer = () => {
  return (
    <footer role="contentinfo" className="footer">
      <p className="footer__text">Krzysztof Szczepański - All rights reserved {getCurrentYear()}</p>
    </footer>
  );
};

export default Footer;
