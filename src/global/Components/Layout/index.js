import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../../contexts/User';
import { navItems, unauthenticatedRoutes } from '../../../utils/constants';
import Footer from '../Footer';
import Header from '../Header';
import MobileNav from '../MobileNav';
import { useAuth } from '../../../hooks/useAuth';

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { refetchUser } = useAuth();

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const currentRoute = history.location.pathname;

    if (!unauthenticatedRoutes.includes(currentRoute)) {
      localStorage.setItem('current-route', currentRoute);
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      (() => refetchUser())();
      return () => false;
    }
  }, [user]);

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
