import '../../styles/global/Components/Input.scss';

const Input = ({ labelName, register, type, name, callback, labelClass = '', inputClass = '', ...rest }) => {
  return (
    <label className={`label form__label ${labelClass}`}>
      {labelName} <br />
      <input ref={register} type={type} name={name} className={`input form__input ${inputClass}`} {...rest} required />
    </label>
  );
};

export default Input;
