import '../../../global/Components/Input/styles.scss';

const Input = ({ name, labelName, value, callback, borderColor = '#dbdbdb' }) => {
  return (
    <label aria-label={labelName} className="label form__label quizForm__label">
      {labelName} <br />
      <input
        className="input form__input quizForm__input"
        type="text"
        required
        style={{ borderBottom: `2px solid ${borderColor}` }}
        name={name}
        value={value}
        onChange={callback}
      />
    </label>
  );
};

export default Input;
