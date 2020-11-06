import { memo } from 'react';
import Footer from '../global/Footer/Footer';
import Header from '../global/Header/Header';
import WelcomingInformations from './WelcomingInformations';
import Infographic from './InfoGraphic';

const SplashScreen = () => {
  return (
    <>
      <Header />
      <WelcomingInformations />
      <Infographic />
      <Footer />
    </>
  );
};

export default memo(SplashScreen);
