import { ArrowLeftIcon } from '../../../global/Icons';
import './PreviousQuestion.scss';

const PreviousQuestionButton = ({ callback }) => {
  return (
    <button aria-label="switch to the previos question" className="button previousQuestionButton" onClick={(e) => callback(e)}>
      <ArrowLeftIcon />
      previous
    </button>
  );
};

export default PreviousQuestionButton;
