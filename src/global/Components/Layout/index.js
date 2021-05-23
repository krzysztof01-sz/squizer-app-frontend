import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/User';
import { navItems } from '../../../utils/constants';
import Footer from '../Footer';
import Header from '../Header';
import MobileNav from '../MobileNav';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Header />
      {user ? <MobileNav navItems={navItems} /> : null}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
