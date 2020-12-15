import { FinishIcon } from '../../../global/Icons/icons';
import './FinishQuiz.scss';

const FinishQuizButton = ({ checkAnswers }) => {
  return (
    <button onClick={checkAnswers} className="button finishQuizButton">
      Finish <FinishIcon />
    </button>
  );
};

export default FinishQuizButton;
