import axios from 'axios';
import { firebaseStorage } from '../../config/firebase';
import { photoTypes, responseTypes } from '../utils/constants';
import DefaultAvatar from '../assets/images/DefaultAvatar.png';

// const baseURL = 'https://squizer-backend.ct8.pl';
const baseURL = 'http://localhost:8080/';

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': baseURL,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Auth API

export const getToken = async () => {
  const { data } = await instance.get('/auth/csrf').catch(({ response }) => response);
  return data.csrfToken;
};

export const registerUser = async (formData) => {
  const { data } = await instance
    .post('/auth/register', JSON.stringify({ ...formData }), { headers: { 'csrf-token': formData._csrf } })
    .catch(({ response }) => response);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await instance
    .post('/auth/login', JSON.stringify({ ...formData }), { headers: { 'csrf-token': formData._csrf } })
    .catch(({ response }) => response);
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('auth-token');
  location.reload();
};

// User API

const determineUserAvatar = async (user) => {
  return user.avatarType === photoTypes.custom ? await getUserAvatar(user._id) : DefaultAvatar;
};

const processUser = async ({ password, ...user }) => {
  const userAvatar = await determineUserAvatar(user);
  return { ...user, avatar: userAvatar };
};

export const getUser = async (userId) => {
  const { data } = await instance.get(`/api/users/${userId}`).catch(({ response }) => response);
  const { type, user } = data;

  if (type === responseTypes.success) {
    const processedUser = await processUser(user);
    return processedUser;
  } else {
    user.nick = '';
    user.avatar = DefaultAvatar;
  }

  return user;
};

export const getUsers = async () => {
  const { data } = await instance.get('/api/users').catch(({ response }) => response);
  return data;
};

export const getUserQuizzes = async (userId) => {
  const { data } = await instance.get(`/api/users/${userId}/quizzes`).catch(({ response }) => response);
  return data;
};

export const addUserAvatar = async (userId, avatar) => {
  try {
    const snapshot = await firebaseStorage.ref(`avatars/${userId}`).put(avatar);
    return snapshot.state;
  } catch (err) {
    return err.message;
  }
};

export const getUserAvatar = async (userId) => {
  const avatar = await firebaseStorage
    .ref(`avatars/${userId}`)
    .getDownloadURL()
    .catch((err) => DefaultAvatar);
  return avatar;
};

export const updateUserStatistics = async (quizId, stats) => {
  const { data } = await instance.put('/api/users', JSON.stringify({ quizId, stats })).catch(({ response }) => response);
  return data;
};

export const getProfileData = async () => {
  const { data } = await instance.get('/api/me').catch(({ response }) => response);
  return data;
};

const deleteUserAvatar = async (userId) => {
  try {
    await firebaseStorage.ref(`avatars/${userId}`).delete();
  } catch (e) {
    throw e;
  }
};

const updateUserAvatarType = async (userId, type) => {
  const { data } = await instance
    .put(`/api/users/${userId}/update-avatar/${type}`, JSON.stringify({ avatarType: type }))
    .catch(({ response }) => response);
  return data;
};

export const updateUserAvatar = async (userId, avatarType, avatar = null) => {
  try {
    if (avatarType === photoTypes.default) {
      await deleteUserAvatar(userId);
      await updateUserAvatarType(userId, avatarType);
    } else {
      await addUserAvatar(userId, avatar);
      await updateUserAvatarType(userId, avatarType);
    }
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

//  Quizzes API

export const getQuiz = async (id) => {
  const { data } = await instance.get(`/api/quizzes/${id}`).catch(({ response }) => response);
  return data;
};

export const getQuizzes = async () => {
  const { data } = await instance.get('/api/quizzes').catch(({ response }) => response);
  return data;
};

export const addQuiz = async (quiz) => {
  const { data } = await instance.post('/api/quizzes', JSON.stringify({ ...quiz })).catch(({ response }) => response);
  return data;
};

export const getQuizQuestions = async (quizId) => {
  const { data } = await instance.get(`/api/quizzes/${quizId}/questions`).catch(({ response }) => response);
  return data;
};

export const getQuizComments = async (quizId) => {
  const { data } = await instance.get(`/api/quizzes/${quizId}/comments`).catch(({ response }) => response);
  return data;
};

export const deleteQuiz = async (quizId) => {
  const { data } = await instance.delete(`/api/quizzes/${quizId}`).catch(({ response }) => response);
  return data;
};

export const addComment = async (quizId, comment) => {
  const { data } = await instance
    .post(`/api/quizzes/${quizId}/comments`, JSON.stringify({ content: comment }))
    .catch(({ response }) => response);
  return data;
};

// other

export const getCategoryImage = async (moduleName) => {
  const { default: image } = await import(`../assets/images/categories/${moduleName}.png`);
  return image;
};
