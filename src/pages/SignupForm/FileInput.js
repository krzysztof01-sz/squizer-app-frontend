import '../../styles/pages/SignupForm/FileInput.scss';
import '../../styles/global/Components/Button.scss';

const forceClick = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.click();
  }
};

const FileInput = ({ handleChange }) => {
  return (
    <label className="button fileInput__label">
      <span
        className="fileInput__label--accessible"
        role="button"
        aria-controls="filename"
        tabIndex="0"
        onKeyPress={forceClick}
      >
        add a photo
      </span>
      <input
        type="file"
        name="photo"
        className="fileInput form__fileInput"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default FileInput;
