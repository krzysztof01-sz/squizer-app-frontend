import { ArrowRightIcon } from '../Icons/icons';
import '../../styles/global/Buttons/NextQuestionButton.scss';

const NextQuestionButton = ({ setQuestion }) => {
  return (
    <button onClick={setQuestion} className="button nextQuestionButton">
      next <ArrowRightIcon />
    </button>
  );
};

export default NextQuestionButton;
