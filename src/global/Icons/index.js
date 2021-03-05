import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faArrowLeft,
  faArrowRight,
  faChartBar,
  faCheck,
  faChevronDown,
  faFlagCheckered,
  faPlusCircle,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import cameraIcon from './camera.svg';
import binIcon from './bin.svg';

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

export const CameraIcon = () => {
  return <img src={cameraIcon} alt="camera icon" />;
};

export const BinIcon = () => {
  return <img className="binIcon" src={binIcon} alt="bin icon" />;
};

export const ExitIcon = () => {
  return <FontAwesomeIcon className="exitIcon" icon={faTimes} />;
};

export const CheckIcon = () => {
  return <FontAwesomeIcon className="checkIcon" icon={faCheck} />;
};
