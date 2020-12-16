import ReactLoading from 'react-loading';
import './styles.scss';
import { colors } from '../../../utils/constants';

const Loader = ({ width, height }) => {
  return (
    <div className="loader">
      <ReactLoading type="spinningBubbles" color={colors.primaryColor} height={width} width={height} />
    </div>
  );
};

export default Loader;
