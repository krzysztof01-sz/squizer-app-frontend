import { useEffect, useState } from 'react';
import * as api from '../api';
import { responseTypes } from '../utils/constants';
import DefaultPhoto from '../assets/images/DefaultPhoto.png';

export const useUser = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async (userId) => {
      const response = await api.getUserById(userId);
      const { type } = response;
      if (type === responseTypes.success) {
        const { user } = response;
        delete user.password;
        setUser(user);
        if (user.photoType === 'custom') {
          const photoLink = await api.getUserPhoto(userId);
          setUser((prev) => ({ ...prev, userPhoto: photoLink }));
        } else setUser((prev) => ({ ...prev, userPhoto: DefaultPhoto }));
      } else {
        setUser((prev) => ({ ...prev, nick: '' }));
        setUser((prev) => ({ ...prev, userPhoto: DefaultPhoto }));
      }
    };
    getUserData(id);
  }, []);

  return { user };
};

export const useCategoryImage = (category) => {
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    const getCategoryImage = async (moduleName) => {
      const { default: image } = await import(`../assets/images/categories/${moduleName}.png`);
      setCategoryImage(image);
    };
    getCategoryImage(category);
  }, []);

  return { categoryImage };
};
