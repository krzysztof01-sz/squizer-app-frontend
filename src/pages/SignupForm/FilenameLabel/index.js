import './styles.scss';

const FilenameLabel = ({ avatar }) => {
  const photoName = avatar?.name;

  return photoName ? (
    <p aria-label={`You've chosen ${photoName} file.`} className="filenameLabel">
      {photoName}
    </p>
  ) : (
    <p className="filenameLabel">{avatar}</p>
  );
};

export default FilenameLabel;
