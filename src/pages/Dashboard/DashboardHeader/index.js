import { Link } from 'react-router-dom';
import { PlusIcon } from '../../../global/Icons';
import './styles.scss';

const DashboardHeader = () => {
  return (
    <header className="dashboardHeader">
      <h1 className="dashboardHeader__title">Quizzes</h1>
      <Link to="/quizform">
        Add a quiz <PlusIcon />
      </Link>
    </header>
  );
};

export default DashboardHeader;
