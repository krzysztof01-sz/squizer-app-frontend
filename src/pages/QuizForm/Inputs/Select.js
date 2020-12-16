const SelectInput = ({ callback, inputText, value, name, labelName, options }) => {
  return (
    <label className="label form__label quizForm__label">
      {labelName}
      <select onChange={callback} name={name} value={value} className="input form__input quizForm__selectInput">
        <option value="">{inputText}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectInput;
