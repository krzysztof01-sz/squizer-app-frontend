import './styles.scss';

const Input = ({ labelName, register, type, name, labelClass = '', inputClass = '', ...rest }) => {
  return (
    <label aria-label={labelName} className={`label form__label ${labelClass}`}>
      {labelName} <br />
      <input ref={register} type={type} name={name} className={`input form__input ${inputClass}`} {...rest} required />
    </label>
  );
};

export default Input;
