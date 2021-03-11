import { Link } from 'react-router-dom';
import { PlusIcon } from '../../../global/Icons';
import AccessibleWrapper from '../../../global/AccessibleWrapper';
import './styles.scss';

const DashboardHeader = () => {
  return (
    <header className="dashboardHeader">
      <h1 className="dashboardHeader__title">Quizzes</h1>
      <AccessibleWrapper>
        <Link to="/quizform">
          Add a quiz <PlusIcon />
        </Link>
      </AccessibleWrapper>
    </header>
  );
};

export default DashboardHeader;
