import '../../../global/Components/Input/styles.scss';

const Input = ({ name, labelName, value, callback }) => {
  return (
    <label className="label form__label quizForm__label">
      {labelName} <br />
      <input className="input form__input quizForm__input" type="text" required name={name} value={value} onChange={callback} />
    </label>
  );
};

export default Input;
