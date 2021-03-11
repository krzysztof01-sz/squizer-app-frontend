import './styles.scss';

const TextArea = ({ comment, setComment }) => {
  return (
    <label className="label" aria-label="content">
      write a comment
      <textarea
        name="content"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={5}
        className="input commentForm__input"
      />
    </label>
  );
};

export default TextArea;
