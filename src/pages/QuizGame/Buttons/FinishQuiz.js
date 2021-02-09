import { FinishIcon } from '../../../global/Icons';
import './FinishQuiz.scss';

const FinishQuizButton = ({ callback }) => {
  return (
    <button onClick={callback} className="button finishQuizButton">
      Finish <FinishIcon />
    </button>
  );
};

export default FinishQuizButton;
