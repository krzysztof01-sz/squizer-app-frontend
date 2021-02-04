import { Link } from 'react-router-dom';
import { PlusIcon } from '../../../global/Icons';
import './styles.scss';

const DashboardHeader = () => {
  return (
    <header className="dashboardHeader">
      <p className="dashboardHeader__title">Quizzes</p>
      <Link to="/quizform">
        <PlusIcon />
      </Link>
    </header>
  );
};

export default DashboardHeader;
