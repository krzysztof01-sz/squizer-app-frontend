import { useEffect, useState } from 'react';
import { responseTypes } from '../utils/constants';
import { shuffleArray } from '../utils/functions';
import * as api from '../api';

export const useUser = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async (userId) => {
      const user = await api.getUserById(userId);
      setUser(user);
    };
    getUserData(id);
  }, []);

  return { user };
};

export const useCategoryImage = (category) => {
  if (!category) return null;
  const [categoryImage, setCategoryImage] = useState('');

  useEffect(() => {
    const getImage = async (cat) => {
      const image = await api.getCategoryImage(cat);
      setCategoryImage(image);
    };
    getImage(category);
  }, []);

  return { categoryImage };
};

export const useQuestions = (quizId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await api.getQuizQuestions(quizId);

      const { type } = response;
      if (type === responseTypes.success) {
        const { questions } = response;
        questions.map((question) => shuffleArray(question.answers));
        setQuestions(questions);
      } else {
        const { msg } = response;
        setError(msg);
      }
      setLoading(false);
    };
    getQuestions();
  }, []);

  return { questions, loading, error };
};

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getQuizzes = async () => {
      const response = await api.getQuizzes();
      const { type } = response;
      if (type === responseTypes.success) {
        const { quizzes } = response;
        setQuizzes(quizzes);
      } else {
        const { msg } = response;
        setError(msg);
      }
      setLoading(false);
    };
    getQuizzes();
  }, []);

  return { quizzes, loading, error };
};

export const useQuizCard = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuiz = async (id) => {
      try {
        const response = await api.getQuiz(id);
        const { type } = response;

        if (type === responseTypes.success) {
          setQuiz(response.data);
        } else {
          throw response.msg;
        }

        const { createdBy, category } = response.data;
        const user = await api.getUserById(createdBy);
        const categoryImage = await api.getCategoryImage(category);
        setUser(user);
        setCategoryImage(categoryImage);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };
    getQuiz(quizId);

    return () => setLoading(false);
  }, []);

  return { quiz, user, categoryImage, error, loading };
};

export const useQuizComments = (quizId) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuizComments = async (id) => {
      setLoading(true);
      const response = await api.getQuizComments(id);
      if (response.type === responseTypes.success) {
        setComments(response.comments);
      } else {
        setError(response.msg);
      }
      setLoading(false);
    };
    getQuizComments(quizId);
  }, []);

  return { comments, error, loading };
};