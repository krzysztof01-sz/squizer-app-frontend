import { useEffect, useState } from 'react';
import * as api from '../api';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await api.getCsrfToken();
      setCsrfToken(token);
    })();
  }, []);

  return { csrfToken };
};
