import './styles.scss';

const FilenameLabel = ({ userPhoto }) =>
  userPhoto?.name ? <p className="filenameLabel">{userPhoto.name}</p> : <p className="filenameLabel">{userPhoto}</p>;

export default FilenameLabel;