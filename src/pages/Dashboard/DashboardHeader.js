import { PlusIcon } from '../../global/Icons/icons';
import '../../styles/pages/Dashboard/DashboardHeader.scss';

const DashboardHeader = () => {
  return (
    <header className="dashboardHeader">
      <p className="dashboardHeader__title">Quizzes</p>
      <PlusIcon />
    </header>
  );
};

export default DashboardHeader;
