import compress from 'browser-image-compression';
import { firebaseStorage } from '../../config/firebaseConfig';
import { prefferedImageExtensions } from './constants';
import { compressionOptions } from './constants';
import moment from 'moment';

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

export const savePhotoInDB = async (file, name) => {
  try {
    const snapshot = await firebaseStorage.ref(`usersPhotos/${name}`).put(file);
    console.log(snapshot);
    return snapshot.state;
  } catch (err) {
    return err.message;
  }
};

export const formatDate = (date) => {
  return moment.utc(date).calendar().split('/').join('-');
};
