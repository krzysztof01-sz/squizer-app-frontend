import LoaderImg from '../../../assets/images/Loader.svg';
import './styles.scss';

const Loader = ({ width = 100, height = 100 }) => {
  return (
    <div className="loader">
      <img
        style={{ width: `${width}px`, height: `${height}px` }}
        src={LoaderImg}
        alt="loader"
        className="loader__img"
      />
    </div>
  );
};

export default Loader;
