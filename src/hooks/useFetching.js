import { useEffect, useState } from 'react';
import { responseTypes } from '../utils/constants';
import axios from 'axios';

// MethodArgs must be passed in right order accordaing to the api/index.js file
export const useFetching = (method, ...methodArgs) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    (async () => {
      const { type, data, msg } = await method([...methodArgs]);

      if (type === responseTypes.success) {
        setData(data);
      } else {
        setError(msg);
      }

      setLoading(false);
    })();

    return () => source.cancel();
  }, []);

  return { data, loading, error };
};
