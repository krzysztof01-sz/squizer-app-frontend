import ReactLoading from 'react-loading';
import '../../styles/global/Components/Loader.scss';
import { primaryColor } from '../../utils/constants';

const Loader = ({ width, height }) => {
  return (
    <div className="loader">
      <ReactLoading type="spinningBubbles" color={primaryColor} height={width} width={height} />
    </div>
  );
};

export default Loader;
