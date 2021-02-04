import './styles.scss';

const AddCommentButton = ({ disabled }) => {
  return (
    <button disabled={disabled} className="button commentForm__button">
      Add
    </button>
  );
};

export default AddCommentButton;
