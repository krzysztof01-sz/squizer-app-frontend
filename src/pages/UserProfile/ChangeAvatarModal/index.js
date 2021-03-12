import { useState } from 'react';
import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import DefaultAvatar from '../../../assets/images/DefaultAvatar.png';
import { compressPhoto, isFileImage } from '../../../utils/functions';
import AvatarPreview from '../../../global/Components/AvatarPreview';
import DefaultAvatarButton from '../../../global/Buttons/DefaultAvatarButton';
import FileInput from '../../../global/Components/FileInput';
import { ExitIcon } from '../../../global/Icons';
import SetAvatarButton from '../SetAvatarButton';
import * as fb from '../../../utils/feedbackMessages';
import * as api from '../../../api';
import { photoTypes } from '../../../utils/constants';
import './styles.scss';

const ChangeAvatarModal = ({ isOpen, setIsOpen, userId, shouldDefaultOptionRender }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const setDefaultAvatar = () => {
    setPreview(DefaultAvatar);
    setAvatar(photoTypes.default);
    setError('');
  };

  const showAvatar = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setPreview(this.result);
    });
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = async (e) => {
    const avatar = e.target.files[0];

    if (!isFileImage(avatar)) {
      setError(fb.AVATAR_EXTENSION_ERROR);
      setPreview(null);
      setAvatar(null);
      return false;
    }

    setError('');

    const compressedAvatar = await compressPhoto(avatar);
    if (!compressedAvatar) return setError(fb.AVATAR_COMPRESSING_ERROR);

    showAvatar(compressedAvatar);
    setAvatar(compressedAvatar);
    setPreview(compressedAvatar);
  };

  return isOpen ? (
    <section className="changeAvatarModal">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ExitIcon />
      </button>
      <AvatarPreview preview={preview} />
      <ErrorMessage message={error} />
      <section className="buttonsWrapper">
        <FileInput handleChange={handleAvatarChange} />
        {shouldDefaultOptionRender ? <DefaultAvatarButton handleClick={setDefaultAvatar} /> : null}
      </section>
      {avatar ? (
        <SetAvatarButton
          callback={async () => {
            let response;
            if (typeof avatar === 'string') {
              response = await api.setAvatar(userId, photoTypes.default);
            } else {
              response = await api.setAvatar(userId, photoTypes.custom, avatar);
            }

            if (response?.success) {
              location.reload();
            } else {
              setError(fb.UPDATING_AVATAR_ERROR);
            }
          }}
        />
      ) : null}
    </section>
  ) : null;
};

export default ChangeAvatarModal;
