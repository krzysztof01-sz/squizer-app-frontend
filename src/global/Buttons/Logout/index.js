import { useContext } from 'react';
import { logoutUser } from '../../../api';
import { AuthContext } from '../../../contexts/Auth';
import { LOGOUT_CONFIRMATION } from '../../../utils/feedbackMessages';
import './styles.scss';

const LogoutButton = () => {
  const { setIsLogged } = useContext(AuthContext);
  return (
    <button
      className="button logoutButton"
      onClick={() => {
        if (confirm(LOGOUT_CONFIRMATION)) {
          localStorage.removeItem('isLogged');
          setIsLogged(false);
          return logoutUser();
        } else return false;
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
