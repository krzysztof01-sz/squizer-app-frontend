import { ArrowRightIcon } from '../../../global/Icons/icons';
import './NextQuestion.scss';

const NextQuestionButton = ({ setQuestion }) => {
  return (
    <button onClick={setQuestion} className="button nextQuestionButton">
      next <ArrowRightIcon />
    </button>
  );
};

export default NextQuestionButton;
