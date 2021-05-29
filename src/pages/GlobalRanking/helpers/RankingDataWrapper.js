import { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultAvatar from '../../../assets/images/DefaultAvatar.png';
import * as api from '../../../api';
import { photoTypes } from '../../../utils/constants';

const RankingDataWrapper = ({ user, children }) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    (async (id) => {
      if (user.avatarType === photoTypes.default) {
        setAvatar(DefaultAvatar);
      } else {
        const avatar = await api.getUserAvatar(id);
        setAvatar(avatar);
      }
      setLoading(false);
    })(user._id);

    return () => source.cancel();
  }, []);

  return children({ user: { ...user, avatar }, loading });
};

export default RankingDataWrapper;
