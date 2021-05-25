import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import compress from 'browser-image-compression';
import { prefferedImageExtensions, compressionOptions } from './constants';

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

export const formatDate = (date) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};

export const shortenText = (text, length) => {
  if (text.length > length) {
    text = text.slice(0, length).concat('...');
  }

  return text;
};
