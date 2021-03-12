import { useEffect, useState } from 'react';
import DefaultAvatar from '../../../assets/images/DefaultAvatar.png';
import * as api from '../../../api';
import { photoTypes } from '../../../utils/constants';

const RankingDataWrapper = ({ user, children }) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvatar = async (id) => {
      if (user.avatarType === photoTypes.default) {
        setAvatar(DefaultAvatar);
      } else {
        const avatar = await api.getAvatar(id);
        setAvatar(avatar);
      }
      setLoading(false);
    };
    getAvatar(user._id);
  }, []);

  return children({ user: { ...user, avatar }, loading });
};

export default RankingDataWrapper;
