import { useEffect, useState } from 'react';
import * as api from '../api';

export const useUser = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async (userId) => {
      const user = await api.getUser(userId);
      setUser(user);
    })(id);
  }, []);

  return { user };
};
