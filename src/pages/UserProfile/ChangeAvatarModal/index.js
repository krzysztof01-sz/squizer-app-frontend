import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import AvatarPreview from '../../../global/Components/AvatarPreview';
import DefaultAvatarButton from '../../../global/Buttons/DefaultAvatarButton';
import FileInput from '../../../global/Components/FileInput';
import { ExitIcon } from '../../../global/Icons';
import SetAvatarButton from '../SetAvatarButton';
import * as api from '../../../api';
import { photoTypes, responseTypes } from '../../../utils/constants';
import { useFileInput } from '../../../hooks/useFileInput';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';
import './styles.scss';
import { useState } from 'react';

const ChangeAvatarModal = ({ isOpen, setIsOpen, userId, shouldDefaultOptionRender }) => {
  const { avatar, preview, process, handleAvatarChange, setDefaultAvatar } = useFileInput();
  const [result, setResult] = useState({ type: '', msg: '' });

  return isOpen ? (
    <section className="changeAvatarModal">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ExitIcon />
      </button>
      <AvatarPreview preview={preview} />
      <ProcessMessage message={process} />
      <ActionResultMessage type={result?.type} msg={result?.msg} />

      <section className="buttonsWrapper">
        <FileInput handleChange={handleAvatarChange} />
        {shouldDefaultOptionRender ? <DefaultAvatarButton handleClick={setDefaultAvatar} /> : null}
      </section>
      {avatar ? (
        <SetAvatarButton
          callback={async () => {
            const response =
              typeof avatar === 'string'
                ? await api.updateUserAvatar(userId, photoTypes.default)
                : await api.updateUserAvatar(userId, photoTypes.custom, avatar);

            setResult(response);
            if (response.type === responseTypes.success) {
              setTimeout(() => location.reload(), 300);
            }
          }}
        />
      ) : null}
    </section>
  ) : null;
};

export default ChangeAvatarModal;
