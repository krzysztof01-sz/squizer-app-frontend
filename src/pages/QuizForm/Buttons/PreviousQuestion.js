import { ArrowLeftIcon } from '../../../global/Icons/icons';
import './PreviousQuestion.scss';

const PreviousQuestionButton = ({ callback }) => {
  return (
    <button className="button previousQuestionButton" onClick={(e) => callback(e)}>
      <ArrowLeftIcon />
      previous
    </button>
  );
};

export default PreviousQuestionButton;
