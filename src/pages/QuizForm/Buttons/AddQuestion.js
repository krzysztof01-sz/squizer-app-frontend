import { ArrowCircleRight } from '../../../global/Icons';
import './AddQuestion.scss';

const AddQuestionButton = ({ callback }) => {
  return (
    <button aria-label="add a question" onClick={(e) => callback(e)} className="button addQuestionButton">
      add <ArrowCircleRight />
    </button>
  );
};

export default AddQuestionButton;
