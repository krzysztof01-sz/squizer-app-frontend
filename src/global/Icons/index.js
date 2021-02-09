import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faArrowLeft,
  faArrowRight,
  faChartBar,
  faChevronDown,
  faFlagCheckered,
  faPlusCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

export const ChevronIcon = () => {
  return <FontAwesomeIcon className="chevronIcon" icon={faChevronDown} />;
};

export const SearchIcon = () => {
  return <FontAwesomeIcon className="searchIcon" icon={faSearch} />;
};

export const PlusIcon = () => {
  return <FontAwesomeIcon className="plusIcon" icon={faPlusCircle} />;
};

export const ArrowRightIcon = () => {
  return <FontAwesomeIcon className="arrowRightIcon" icon={faArrowRight} />;
};

export const ArrowCircleRight = () => {
  return <FontAwesomeIcon className="arrowCircleRightIcon" icon={faArrowCircleRight} />;
};

export const ArrowLeftIcon = () => {
  return <FontAwesomeIcon className="arrowLeftIcon" icon={faArrowLeft} />;
};

export const FinishIcon = () => {
  return <FontAwesomeIcon className="finishQuizIcon" icon={faFlagCheckered} />;
};

export const ChartBarIcon = () => {
  return <FontAwesomeIcon className="chartBarIcon" icon={faChartBar} />;
};
