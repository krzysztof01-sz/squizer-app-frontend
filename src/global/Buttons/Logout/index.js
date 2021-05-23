import * as api from '../../../api';
import { LOGOUT_CONFIRMATION } from '../../../utils/feedbackMessages';
import './styles.scss';

const LogoutButton = () => {
  return (
    <button
      className="button logoutButton"
      onClick={async () => {
        if (confirm(LOGOUT_CONFIRMATION)) {
          const { success } = await api.logoutUser();
          if (success) location.assign('/login');
        } else {
          return false;
        }
      }}
    >
      <p>Logout</p>
    </button>
  );
};

export default LogoutButton;
