const TextAreaInput = ({ callback, labelName, value, name, labelClass = '', inputClass = '', ...rest }) => {
  return (
    <label className="label form__label quizForm__label">
      {labelName}
      <textarea
        onChange={callback}
        name={name}
        value={value}
        className="input form__input quizForm__textArea"
        {...rest}
      ></textarea>
    </label>
  );
};

export default TextAreaInput;
