import { useEffect, useState } from 'react';
import * as api from '../api';

export const useCategoryImage = (category) => {
  if (!category) return null;
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    (async (cat) => {
      const image = await api.getCategoryImage(cat);
      setCategoryImage(image);
    })(category);
  }, []);

  return { categoryImage };
};
