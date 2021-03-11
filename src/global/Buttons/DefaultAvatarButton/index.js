import './styles.scss';
import '../../../styles/global/Components/Button.scss';
import AccessibleWrapper from '../../AccessibleWrapper';

const DefaultAvatarButton = ({ handleClick }) => {
  return (
    <AccessibleWrapper>
      <button className="button defaultAvatarButton" onClick={handleClick}>
        use default
      </button>
    </AccessibleWrapper>
  );
};

export default DefaultAvatarButton;
