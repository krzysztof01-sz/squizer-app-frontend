import { firebaseStorage } from '../../config/firebase';
import { responseTypes } from '../utils/constants';
import DefaultAvatar from '../assets/images/DefaultAvatar.png';

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
  const response = await fetch(`${baseURL}/api/users/${userId}`, getRequestObject());
  const data = await response.json();

  const { type, user } = data;

  if (type === responseTypes.success) {
    delete user.password;

    if (user.avatarType === 'custom') {
      const avatarLink = await getAvatar(userId);
      user.avatar = avatarLink;
    } else {
      user.avatar = DefaultAvatar;
    }
  } else {
    user.nick = '';
    user.avatar = DefaultAvatar;
  }

  return user;
};

export const getQuizzes = async () => {
  const quizzes = await fetch(`${baseURL}/api/quizzes`, getRequestObject());
  const response = await quizzes.json();
  return response;
};

export const getAvatar = async (userId) => {
  const avatarLink = await firebaseStorage.ref(`avatars/${userId}`).getDownloadURL();
  return avatarLink;
};

export const getCategoryImage = async (moduleName) => {
  const { default: image } = await import(`../assets/images/categories/${moduleName}.png`);
  return image;
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
  const data = await fetch(`${baseURL}/api/quizzes/${quizId}/questions`, getRequestObject());
  const response = await data.json();
  return response;
};

export const getQuiz = async (id) => {
  const response = await fetch(`${baseURL}/api/quizzes/${id}`, getRequestObject());
  const data = await response.json();

  return data;
};

export const addComment = async (comment) => {
  const response = await fetch(`${baseURL}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'auth-token': localStorage.getItem('auth-token'),
    },
    body: JSON.stringify({ ...comment }),
  });

  const result = await response.json();
  return result;
};

export const getQuizComments = async (quizId) => {
  const response = await fetch(`${baseURL}/api/quizzes/${quizId}/comments`, getRequestObject());

  const result = await response.json();
  return result;
};
