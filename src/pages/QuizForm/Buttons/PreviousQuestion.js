import AccessibleWrapper from '../../../global/AccessibleWrapper';
import { ArrowLeftIcon } from '../../../global/Icons';
import './PreviousQuestion.scss';

const PreviousQuestionButton = ({ callback }) => {
  return (
    <AccessibleWrapper>
      <button
        tabIndex="-1"
        aria-label="switch to the previos question"
        className="button previousQuestionButton"
        onClick={(e) => callback(e)}
      >
        <ArrowLeftIcon />
        previous
      </button>
    </AccessibleWrapper>
  );
};

export default PreviousQuestionButton;
