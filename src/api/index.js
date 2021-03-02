import { firebaseStorage } from '../../config/firebase';
import { responseTypes } from '../utils/constants';
import DefaultAvatar from '../assets/images/DefaultAvatar.png';

const baseURL = 'http://localhost:8080';

const getBasicRequestObject = () => {
  return {
    headers: {
      'auth-token': localStorage.getItem('auth-token'),
    },
  };
};

const getPostRequestObject = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'auth-token': localStorage.getItem('auth-token'),
    },
  };
};

const getAuthRequestObject = (csrfToken) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken,
    },
  };
};

const getUpdateRequestObject = () => {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
    ...getAuthRequestObject(csrfToken),
    body: JSON.stringify({ ...formData }),
  });

  const response = await feedback.json();
  return response;
};

export const loginUser = async (formData, csrfToken) => {
  const feedback = await fetch(`${baseURL}/auth/login`, {
    ...getAuthRequestObject(csrfToken),
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
  const response = await fetch(`${baseURL}/api/users/${userId}`, getBasicRequestObject());
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
  const quizzes = await fetch(`${baseURL}/api/quizzes`, getBasicRequestObject());
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
    ...getPostRequestObject(),
    body: JSON.stringify({ ...quiz }),
  });

  const response = await result.json();
  return response;
};

export const getQuizQuestions = async (quizId) => {
  const data = await fetch(`${baseURL}/api/quizzes/${quizId}/questions`, getBasicRequestObject());
  const response = await data.json();
  return response;
};

export const getQuiz = async (id) => {
  const response = await fetch(`${baseURL}/api/quizzes/${id}`, getBasicRequestObject());
  const data = await response.json();

  return data;
};

export const addComment = async (comment) => {
  const response = await fetch(`${baseURL}/api/comments`, {
    ...getPostRequestObject(),
    body: JSON.stringify({ ...comment }),
  });

  const result = await response.json();
  return result;
};

export const getQuizComments = async (quizId) => {
  const response = await fetch(
    `${baseURL}/api/quizzes/${quizId}/comments`,
    getBasicRequestObject(),
  );

  const result = await response.json();
  return result;
};

export const getAllUsers = async () => {
  const response = await fetch(`${baseURL}/api/users`, getBasicRequestObject());

  const result = await response.json();
  return result;
};

export const updateUserAfterGame = async (quizId, points) => {
  const response = await fetch(`${baseURL}/api/users`, {
    ...getUpdateRequestObject(),
    body: JSON.stringify({ quizId, points }),
  });

  const result = await response.json();
  return result;
};

export const getProfileData = async () => {
  const response = await fetch(`${baseURL}/api/account`, getBasicRequestObject());
  const data = await response.json();

  return data;
};

export const getUserQuizzes = async (userId) => {
  const response = await fetch(`${baseURL}/api/users/${userId}/quizzes`, getBasicRequestObject());
  const data = await response.json();

  return data;
};

export const getUserCorrectAnswersRate = async (userId) => {
  const response = await fetch(
    `${baseURL}/api/users/${userId}/correct-answers-rate`,
    getBasicRequestObject(),
  );
  const data = await response.json();

  return data;
};

export const setUserAvatar = async (userId, avatar) => {
  try {
    const snapshot = await firebaseStorage.ref(`avatars/${userId}`).put(avatar);
    return snapshot.state;
  } catch (err) {
    return err.message;
  }
};

export const deleteUserPhoto = async (userId) => {
  try {
    await firebaseStorage.ref(`avatars/${userId}`).delete();
  } catch (e) {
    throw e;
  }
};

export const setUserAvatarType = async (userId, type) => {
  const response = await fetch(`${baseURL}/api/users/${userId}/set-avatar/${type}`, {
    ...getUpdateRequestObject(),
    body: JSON.stringify({ avatarType: type }),
  });
  const data = await response.json();
  return data;
};

export const setAvatar = async (userId, avatarType, avatar = null) => {
  try {
    if (avatarType === 'default') {
      await deleteUserPhoto(userId);
      await setUserAvatarType(userId, avatarType);
    } else {
      await setUserAvatar(userId, avatar);
      await setUserAvatarType(userId, avatarType);
    }
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};
