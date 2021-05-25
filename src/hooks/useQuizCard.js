import { useEffect, useState } from 'react';
import { responseTypes } from '../utils/constants';
import * as api from '../api';

export const useQuizCard = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async (id) => {
      try {
        const { data, type, msg } = await api.getQuiz(id);
        if (type === responseTypes.error) throw msg;

        setQuiz(data);

        const { createdBy, category } = data;
        const user = await api.getUser(createdBy);
        const categoryImage = await api.getCategoryImage(category);
        setUser(user);
        setCategoryImage(categoryImage);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    })(quizId);

    return () => setLoading(false);
  }, []);

  return { quiz, user, categoryImage, error, loading };
};
