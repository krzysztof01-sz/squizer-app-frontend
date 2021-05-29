import { useEffect, useState } from 'react';
import Spinner from 'react-loading';
import { colors } from '../../../utils/constants';
import WaitImg from '../../../assets/images/Wait.svg';
import './styles.scss';

const Loader = ({ width = 100, height = 100 }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setShouldRender(true), 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="loader">
      {shouldRender ? (
        <>
          <h2 className="loader__message">Wait for a moment, loading is in progress...</h2>
          <h2 className="loader__tip">Check your internet hook-up</h2>
          <img alt="Loading image" className="loader__timeImage" src={WaitImg} />
        </>
      ) : (
        <Spinner className="loader__image" type="bubbles" width={width} height={height} color={colors.primary} />
      )}
    </div>
  );
};

export default Loader;
