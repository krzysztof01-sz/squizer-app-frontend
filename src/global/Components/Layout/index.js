import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/Auth';
import { navItems } from '../../../utils/constants';
import Footer from '../Footer';
import Header from '../Header';
import MobileNav from '../MobileNav';

const Layout = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Header />
      {isLogged ? <MobileNav navItems={navItems} /> : null}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
