import { memo } from 'react';
import Layout from '../../global/Components/Layout/index';

import Description from './Description';
import Hero from './Hero';
import CTA from './CTA';
import Slider from './Slider';

import SwitchDot from '../QuizGame/SwitchDot';
import Image from './Slider/Image';
import BgImage from '../../assets/images/bgs/bg1.png';
import screen1 from '../../assets/images/screens/screen1.png';
import screen2 from '../../assets/images/screens/screen2.png';
import './index.scss';

const SplashScreen = () => {
  const images = [screen1, screen2, 'https://unsplash.it/900/1900'];
  const translationSize = 100;
  const transitionTime = 0.4;

  return (
    <Layout>
      <main className="splashScreen__wrapper" style={{ backgroundImage: `url(${BgImage})` }}>
        <section className="splashScreen__firstPart">
          <Description />
          <Hero />
        </section>
        <section className="splashScreen__secondPart">
          <CTA />
          <Slider imagesLength={images.length}>
            {(imageID, setImageID) => (
              <section className="slider">
                <section className="slider__imageSection">
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      styles={{
                        transform: `translateX(-${translationSize * imageID}%)`,
                        transition: `transform ${transitionTime}s`,
                      }}
                    />
                  ))}
                </section>
                <section className="slider__switchSection">
                  {images.map((image, index) => (
                    <SwitchDot
                      key={index}
                      callback={() => setImageID(index)}
                      filled={index === imageID}
                    />
                  ))}
                </section>
              </section>
            )}
          </Slider>
        </section>
      </main>
    </Layout>
  );
};

export default memo(SplashScreen);
