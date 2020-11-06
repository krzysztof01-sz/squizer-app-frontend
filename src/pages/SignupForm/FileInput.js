const FileInput = ({ handleChange }) => {
  return (
    <label className="label form__label">
      add an avatar
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
