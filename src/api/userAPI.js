import { firebaseStorage } from '../../config/firebaseConfig';

const baseURL = 'http://localhost:8080';

const getRequestObject = () => {
  const authToken = localStorage.getItem('auth-token');
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'auth-token': authToken,
    },
  };
};

export const getToken = async () => {
  const data = await fetch(`${baseURL}/api/getcsrf`);
  const { csrfToken } = await data.json();
  return csrfToken;
};

export const addUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/api/adduser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ ...formData }),
  });

  return await feedback.json();
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

  return await feedback.json();
};

export const logoutUser = () => {
  localStorage.removeItem('auth-token');
  location.reload();
};

export const knockTo = async (page) => {
  const responseObject = getRequestObject();
  const response = await fetch(`${baseURL}/${page}`, responseObject);

  return await response.json();
};

export const getUserById = async (userId) => {
  const responseObject = getRequestObject();
  try {
    const userResponse = await fetch(`${baseURL}/api/users/${userId}`, responseObject);
    const user = await userResponse.json();
    return user;
  } catch (err) {
    return err;
  }
};

export const getQuizzes = async () => {
  const responseObject = getRequestObject();
  const quizzes = await fetch(`${baseURL}/api/quizzes`, responseObject);
  return await quizzes.json();
};

export const getUserPhoto = async (userId) => {
  const userPhotoLink = await firebaseStorage.ref(`usersPhotos/${userId}`).getDownloadURL();
  return userPhotoLink;
};
