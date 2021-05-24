import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import AvatarPreview from '../../../global/Components/AvatarPreview';
import DefaultAvatarButton from '../../../global/Buttons/DefaultAvatarButton';
import FileInput from '../../../global/Components/FileInput';
import { ExitIcon } from '../../../global/Icons';
import SetAvatarButton from '../SetAvatarButton';
import * as fb from '../../../utils/feedbackMessages';
import * as api from '../../../api';
import { photoTypes } from '../../../utils/constants';
import { useFileInput } from '../../../hooks/useFileInput';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';
import './styles.scss';

const ChangeAvatarModal = ({ isOpen, setIsOpen, userId, shouldDefaultOptionRender }) => {
  const { avatar, error, preview, process, handleAvatarChange, setError, setDefaultAvatar } = useFileInput();

  return isOpen ? (
    <section className="changeAvatarModal">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ExitIcon />
      </button>
      <AvatarPreview preview={preview} />
      <ProcessMessage message={process} />
      <ErrorMessage message={error} />
      <section className="buttonsWrapper">
        <FileInput handleChange={handleAvatarChange} />
        {shouldDefaultOptionRender ? <DefaultAvatarButton handleClick={setDefaultAvatar} /> : null}
      </section>
      {avatar ? (
        <SetAvatarButton
          callback={async () => {
            let response =
              typeof avatar === 'string'
                ? await api.updateUserAvatar(userId, photoTypes.default)
                : await api.updateUserAvatar(userId, photoTypes.custom, avatar);

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
