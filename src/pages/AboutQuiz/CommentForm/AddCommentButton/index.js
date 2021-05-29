import './styles.scss';

const AddCommentButton = ({ isDisabled }) => {
  return (
    <button disabled={isDisabled} className="button commentForm__button">
      Add
    </button>
  );
};

export default AddCommentButton;
