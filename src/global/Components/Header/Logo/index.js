import { Link } from 'react-router-dom';
import AccessibleWrapper from '../../../AccessibleWrapper';
import LogoSvg from '../../../../assets/images/Logo.svg';
import './styles.scss';

const Logo = ({ link }) => {
  return (
    <AccessibleWrapper withTabIndex={false}>
      <Link to={link}>
        <div className="header__logo-wrapper" role="button" tabIndex="0">
          <img className="header__logo" src={LogoSvg} alt="logo" />
        </div>
      </Link>
    </AccessibleWrapper>
  );
};

export default Logo;
