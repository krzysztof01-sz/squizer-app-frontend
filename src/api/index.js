import { firebaseStorage } from '../../config/firebase';

const baseURL = 'http://localhost:8080';

const getRequestObject = () => {
  return {
    headers: {
      'auth-token': localStorage.getItem('auth-token'),
    },
  };
};

export const getToken = async () => {
  const data = await fetch(`${baseURL}/auth/csrf`);
  const { csrfToken } = await data.json();
  return csrfToken;
};

export const registerUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ ...formData }),
  });

  const response = await feedback.json();
  return response;
};

export const loginUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ ...formData }),
  });

  const response = await feedback.json();
  return response;
};

export const logoutUser = () => {
  localStorage.removeItem('auth-token');
  location.reload();
};

export const getUserById = async (userId) => {
  const userResponse = await fetch(`${baseURL}/api/users/${userId}`, getRequestObject());
  const user = await userResponse.json();
  return user;
};

export const getQuizzes = async () => {
  const quizzes = await fetch(`${baseURL}/api/quizzes`, getRequestObject());
  const response = await quizzes.json();
  return response;
};

export const getUserPhoto = async (userId) => {
  const userPhotoLink = await firebaseStorage.ref(`usersPhotos/${userId}`).getDownloadURL();
  return userPhotoLink;
};

export const addQuiz = async (quiz) => {
  const result = await fetch(`${baseURL}/api/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'auth-token': localStorage.getItem('auth-token'),
    },
    body: JSON.stringify({ ...quiz }),
  });

  const response = await result.json();
  return response;
};

export const getQuizQuestions = async (quizId) => {
  const data = await fetch(`http://localhost:8080/api/quizzes/${quizId}/questions`, getRequestObject());
  const response = await data.json();
  return response;
};
