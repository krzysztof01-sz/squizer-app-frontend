import './styles.scss';
import '../../../styles/global/Components/Button.scss';

const DefaultAvatarButton = ({ handleClick }) => {
  return (
    <button tabIndex="-1" className="button defaultAvatarButton" onClick={handleClick}>
      <span role="button" className="defaultAvatarButton--accessible" aria-controls="filename" tabIndex="0">
        use default
      </span>
    </button>
  );
};

export default DefaultAvatarButton;
