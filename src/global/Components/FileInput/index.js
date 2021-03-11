import './styles.scss';
import AccessibleWrapper from '../../AccessibleWrapper';

const FileInput = ({ handleChange }) => {
  return (
    <AccessibleWrapper>
      <label aria-label="add an avatar" className="button fileInput__label">
        add an avatar
        <input
          role="button"
          type="file"
          name="avatar"
          className="fileInput form__fileInput"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </AccessibleWrapper>
  );
};

export default FileInput;
