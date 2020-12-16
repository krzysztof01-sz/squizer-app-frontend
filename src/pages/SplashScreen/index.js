import { memo, useEffect } from 'react';
import Footer from '../../global/Components/Footer/index';
import Header from '../../global/Components/Header/index';
import WelcomingInformation from './WelcommingInformation/index';
import Infographic from './InfoGraphic/index';

import './index.scss';

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
