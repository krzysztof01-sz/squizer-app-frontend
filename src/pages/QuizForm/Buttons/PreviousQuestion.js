import { ArrowLeftIcon } from '../../../global/Icons/index';
import './PreviousQuestion.scss';

const PreviousQuestionButton = ({ callback }) => {
  return (
    <button tabIndex="-1" className="button previousQuestionButton" onClick={(e) => callback(e)}>
      <ArrowLeftIcon />
      <span role="button" className="signupButton--accessible" tabIndex="0">
        previous
      </span>
    </button>
  );
};

export default PreviousQuestionButton;
