import './AddQuiz.scss';

const AddQuizButton = ({ callback, isActive }) => {
  return (
    <button
      aria-label="add a quiz"
      disabled={isActive}
      onClick={(e) => {
        e.preventDefault();
        callback();
      }}
      className="button addQuizButton"
    >
      Add quiz
    </button>
  );
};

export default AddQuizButton;
