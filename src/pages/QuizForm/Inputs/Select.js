const SelectInput = ({ callback, inputText, value, name, labelName, options }) => {
  return (
    <label
      aria-label={labelName}
      aria-orientation="vertical"
      className="label form__label quizForm__label"
    >
      {labelName}
      <select
        role="list"
        onChange={callback}
        name={name}
        value={value}
        className="input form__input quizForm__selectInput"
      >
        <option role="listitem" value="">
          {inputText}
        </option>
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
