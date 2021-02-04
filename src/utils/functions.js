import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { firebaseStorage } from '../../config/firebase';
import compress from 'browser-image-compression';
import {
  maxDescrptionLengthOnCard,
  prefferedImageExtensions,
  compressionOptions,
} from './constants';

dayjs.extend(relativeTime);

export const getCurrentYear = () => new Date().getFullYear();

export const isFileImage = (file) => {
  return file ? prefferedImageExtensions.includes(file['type']) : false;
};

export const compressPhoto = async (photo) => {
  try {
    const compressedPhoto = await compress(photo, compressionOptions);
    return compressedPhoto;
  } catch (err) {
    return false;
  }
};

export const saveAvatarInDB = async (avatar, name) => {
  try {
    const snapshot = await firebaseStorage.ref(`avatars/${name}`).put(avatar);
    return snapshot.state;
  } catch (err) {
    return err.message;
  }
};

export const formatDate = (date) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};

export const shortenDescription = (description = '') => {
  if (description.length > maxDescrptionLengthOnCard) {
    description = description.slice(0, maxDescrptionLengthOnCard).concat('...');
  }

  return description;
};

export const shuffleArray = (arr) => {
  arr = arr.sort(() => Math.random() - 0.5);
  return arr;
};
