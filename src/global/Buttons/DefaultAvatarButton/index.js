import './styles.scss';
import '../../../styles/global/Components/Button.scss';

const DefaultAvatarButton = ({ handleClick }) => {
  return (
    <button className="button defaultAvatarButton" onClick={handleClick}>
      use default
    </button>
  );
};

export default DefaultAvatarButton;
