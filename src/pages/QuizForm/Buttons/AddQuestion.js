import { ArrowCircleRight } from '../../../global/Icons';
import './AddQuestion.scss';

const AddQuestionButton = ({ callback }) => {
  return (
    <button onClick={(e) => callback(e)} className="button addQuestionButton addQuestionButton--accessible">
      add <ArrowCircleRight />
    </button>
  );
};

export default AddQuestionButton;
