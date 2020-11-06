import { getCurrentYear } from '../../../utils/functions';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">Krzysztof Szczepański - All rights Reserved {getCurrentYear()}</p>
    </footer>
  );
};

export default Footer;
