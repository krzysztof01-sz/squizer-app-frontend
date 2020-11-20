import { ArrowLeftIcon } from '../Icons/icons';
import '../../styles/global/Buttons/PreviousQuestionButton.scss';

const PreviousQuestionButton = ({ setQuestion }) => {
  return (
    <button onClick={setQuestion} className="button previousQuestionButton">
      <ArrowLeftIcon /> previous
    </button>
  );
};

export default PreviousQuestionButton;
