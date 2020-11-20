import { FinishIcon } from '../Icons/icons';
import '../../styles/global/Buttons/FinishQuizButton.scss';

const FinishQuizButton = ({ checkAnswers }) => {
  return (
    <button onClick={checkAnswers} className="button finishQuizButton">
      Finish <FinishIcon />
    </button>
  );
};

export default FinishQuizButton;
