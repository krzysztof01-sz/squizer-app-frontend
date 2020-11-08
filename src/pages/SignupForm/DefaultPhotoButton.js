import '../../styles/pages/SignupForm/DefaultPhotoButton.scss';
import '../../styles/global/Components/Button.scss';

const DefaultPhotoButton = ({ handleClick }) => {
  return (
    <button tabIndex="-1" className="button defaultPhotoButton" onClick={handleClick}>
      <span role="button" className="defaultPhotoButton--accessible" aria-controls="filename" tabIndex="0">
        use default
      </span>
    </button>
  );
};

export default DefaultPhotoButton;
