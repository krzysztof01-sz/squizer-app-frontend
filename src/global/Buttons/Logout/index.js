import { useAuth } from '../../../hooks/useAuth';
import './styles.scss';

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  return (
    <button className="button logoutButton" onClick={() => logoutUser()}>
      <p>Logout</p>
    </button>
  );
};

export default LogoutButton;
