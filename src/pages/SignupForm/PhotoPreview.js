const PhotoPreview = ({ preview }) => {
  return (
    <div className="photoPreview">
      {preview ? <img src={preview} alt="User photo" /> : <div className="photoPreview"></div>}
    </div>
  );
};

export default PhotoPreview;
