import '../../styles/global/Buttons/LogoutButton.scss';
import { logoutUser } from './../../api/userAPI';
import { LOGOUT_CONFIRMATION } from '../../utils/responseMessages';

const LogoutButton = () => {
  return (
    <button
      className="button logoutButton"
      onClick={() => {
        if (confirm(LOGOUT_CONFIRMATION)) return logoutUser();
        else return false;
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
