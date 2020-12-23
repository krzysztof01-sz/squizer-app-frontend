import Exam from '../../../assets/images/Exam.svg';
import './styles.scss';

const Hero = () => {
  return (
    <section className="hero">
      <img className="hero__image" alt="Hero image" src={Exam} />
    </section>
  );
};

export default Hero;
