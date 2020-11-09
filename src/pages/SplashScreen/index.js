import { memo, useEffect } from 'react';
import Footer from '../global/Footer/Footer';
import Header from '../global/Header/Header';
import WelcomingInformation from './WelcomingInformation';
import Infographic from './InfoGraphic';
import '../../styles/pages/SplashScreen/index.scss';

const SplashScreen = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Header />
      <WelcomingInformation />
      <Infographic />
      <Footer />
    </>
  );
};

export default memo(SplashScreen);
