import { formatDate } from '../../utils/functions';

const QuizCreationDate = ({ creationDate }) => {
  return <p className="quizCard__creationDate">{formatDate(creationDate)}</p>;
};

export default QuizCreationDate;
