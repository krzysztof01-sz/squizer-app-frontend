import './styles.scss';

const PhotoPreview = ({ preview }) => {
  return (
    <div className="photoPreview">
      {preview ? (
        <img className="photoPreview__image" src={preview} alt="User photo" />
      ) : (
        <div className="photoPreview__image"></div>
      )}
    </div>
  );
};

export default PhotoPreview;
