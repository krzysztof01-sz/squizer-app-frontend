import { ArrowLeftIcon } from '../../../global/Icons/icons';
import './PreviousQuestion.scss';

const PreviousQuestionButton = ({ setQuestion }) => {
  return (
    <button onClick={setQuestion} className="button previousQuestionButton">
      <ArrowLeftIcon /> previous
    </button>
  );
};

export default PreviousQuestionButton;
