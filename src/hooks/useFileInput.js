import { useState } from 'react';
import { compressPhoto, isFileImage } from '../utils/functions';
import * as fb from '../utils/feedbackMessages';
import { photoTypes } from '../utils/constants';
import DefaultAvatar from '../assets/images/DefaultAvatar.png';

export const useFileInput = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState('');

  const showAvatar = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setPreview(this.result);
    });
    reader.readAsDataURL(file);
  };

  const setDefaultAvatar = (e) => {
    e.preventDefault();
    setError('');
    setAvatar(photoTypes.default);
    setPreview(DefaultAvatar);
  };

  const handleAvatarChange = async (e) => {
    const avatar = e.target.files[0];
    if (!isFileImage(avatar)) {
      setError(fb.AVATAR_EXTENSION_ERROR);
      setAvatar(null);
      setPreview(null);
      return false;
    }

    setError('');

    setProcess(fb.AVATAR_COMPESSING_START);
    const compressedAvatar = await compressPhoto(avatar);
    setProcess('');

    if (!compressedAvatar) return setError(fb.AVATAR_COMPRESSING_ERROR);
    showAvatar(avatar);
    setAvatar(compressedAvatar);
  };

  return { avatar, preview, setDefaultAvatar, handleAvatarChange, error, setError, process };
};
