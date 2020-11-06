const Input = ({ labelName, register, type, name, ...rest }) => {
  return (
    <label className="label form__label">
      {labelName}
      <input ref={register} type={type} name={name} {...rest} className="input form__input" required />
    </label>
  );
};

export default Input;
