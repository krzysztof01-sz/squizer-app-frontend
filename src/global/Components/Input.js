import '../../styles/global/Components/Input.scss';

const Input = ({ labelName, register, type, name, labelClass = '', inputClass = '', ...rest }) => {
  return (
    <label className={`label form__label ${labelClass}`}>
      {labelName} <br />
      <input ref={register} type={type} name={name} {...rest} className={`input form__input ${inputClass}`} required />
    </label>
  );
};

export default Input;
