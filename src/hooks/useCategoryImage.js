import { useEffect, useState } from 'react';
import * as api from '../api';
import axios from 'axios';

export const useCategoryImage = (category) => {
  if (!category) return null;
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    (async (cat) => {
      const image = await api.getCategoryImage(cat);
      setCategoryImage(image);
    })(category);

    return () => source.cancel();
  }, []);

  return { categoryImage };
};
