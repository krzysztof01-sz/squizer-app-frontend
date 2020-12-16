import './AddQuiz.scss';

const AddQuiz = ({ callback, isActive }) => {
  return (
    <button
      disabled={isActive}
      onClick={(e) => {
        e.preventDefault();
        callback();
      }}
      className="button addQuizButton addQuizButton--accessible"
    >
      Add quiz
    </button>
  );
};

export default AddQuiz;
