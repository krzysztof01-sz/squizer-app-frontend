import { Link } from 'react-router-dom';
import BackgroundGradient from '../../assets/images/BgGradient.svg';
import ExamIcon from '../../assets/images/Exam.svg';
import LoginButton from '../global/Buttons/LoginButton';
import SingupButton from '../global/Buttons/SignupButton';
import '../../styles/pages/SplashScreen/InfoGraphic.scss';

const Infographic = () => {
  return (
    <section className="infographic__wrapper">
      <img src={BackgroundGradient} className="infographic__bgGradient" alt="Background gradient" />
      <div className="infographic">
        <img src={ExamIcon} className="infographic__icon" alt="The exam icon" />
        <div className="buttonsParagraph__wrapper">
          <p className="paragraph infographic__paragraph">
            Join and extend our community. Create a quiz and check your knowledge by solving the other's ones.
          </p>
          <div className="buttons__wrapper">
            <Link to="/login">
              <LoginButton />
            </Link>
            <Link to="/signup">
              <SingupButton />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Infographic;
