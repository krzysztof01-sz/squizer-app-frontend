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
  faTimes,
  faSave,
  faStar,
  faEdit,
  faTrash,
  faPaperPlane,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import cameraIcon from './camera.svg';

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

export const ExitIcon = () => {
  return <FontAwesomeIcon className="exitIcon" icon={faTimes} />;
};

export const SaveIcon = () => {
  return <FontAwesomeIcon className="saveIcon" icon={faSave} />;
};

export const UpdateIcon = () => {
  return <FontAwesomeIcon className="udpateIcon" icon={faEdit} />;
};

export const BinIcon = () => {
  return <FontAwesomeIcon className="binIcon" icon={faTrash} />;
};

export const StarIcon = () => {
  return <FontAwesomeIcon className="starIcon" icon={faStar} />;
};

export const SendIcon = () => {
  return <FontAwesomeIcon className="sendIcon" icon={faPaperPlane} />;
};

export const CheckIcon = () => {
  return <FontAwesomeIcon className="checkIcon" icon={faCheck} />;
};
