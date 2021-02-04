import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as api from '../../../api';
import * as fb from '../../../utils/feedbackMessages';
import DefaultAvatar from '../../../assets/images/DefaultAvatar.png';
import { isFileImage, compressPhoto, saveAvatarInDB } from '../../../utils/functions';

import SingupButton from '../../../global/Buttons/Signup';
import DefaultAvatarButton from '../DefaultAvatarButton';
import AvatarPreview from '../AvatarPreview';
import Input from '../../../global/Components/Input';
import FileInput from '../FileInput';
import FilenameLabel from '../FilenameLabel';
import Loader from '../../../global/Components/Loader';

import InputValidation from '../../../global/Components/Messages/InputValidationMessage';
import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';

import { responseTypes } from '../../../utils/constants';
import './styles.scss';

const Form = () => {
  const history = useHistory();

  const [error, setError] = useState([]);
  const [process, setProcess] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  const schema = yup.object().shape({
    nickname: yup.string().trim().min(3, fb.NICKNAME_SHORT).max(15, fb.NICKNAME_LONG).required(fb.NICKNAME_REQUIRED),
    password: yup.string().trim().min(8, fb.PASSWORD_SHORT).max(15, fb.PASSWORD_LONG).required(fb.PASSWORD_REQUIRED),
    confirmedPassword: yup.string().oneOf([yup.ref('password'), null], fb.DIFFERENT_PASSWORDS),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: '',
      password: '',
      confirmedPassword: '',
      csrf: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(async () => {
    const token = await api.getToken();
    setCsrfToken(token);
  }, []);

  const onSubmit = async (formData) => {
    setValidationMessages([]);

    formData.avatar = avatar;
    formData.avatarType = avatar?.name ? 'custom' : 'default';
    if (!formData.avatar) return setError(fb.CHOOSE_YOUR_AVATAR);

    setProcess(fb.REGISTERING_PROCESS);
    const addingUserResponse = await api.registerUser(formData, csrfToken);
    setProcess('');

    if (addingUserResponse.type === responseTypes.success) {
      const { msg, userId } = addingUserResponse;
      if (formData.avatarType === 'custom') await saveAvatarInDB(avatar, userId);
      setValidationMessages(msg);
      setTimeout(() => history.push('/login'), 500);
    } else {
      const { msg } = addingUserResponse;
      setValidationMessages(msg);
    }
  };

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
    setAvatar('default');
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

  if (csrfToken) {
    return (
      <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
        <section className="form">
          <header className="form__header">Registration form</header>
          <Input labelName="nickname" register={register({ required: true })} type="text" name="nickname" min="3" max="15" />
          <InputValidation message={errors.nickname?.message} />

          <Input labelName="password" register={register({ required: true })} type="password" name="password" min="8" max="15" />
          <InputValidation message={errors.password?.message} />

          <Input labelName="confirm the password" register={register({ required: true })} type="password" name="confirmedPassword" min="8" max="15" />
          <InputValidation message={errors.confirmedPassword?.message} />

          <AvatarPreview preview={preview} />
          <FilenameLabel avatar={avatar} />

          <div className="fileInputWrapper">
            <FileInput handleChange={handleAvatarChange} />
            <DefaultAvatarButton handleClick={setDefaultAvatar} />
          </div>

          <ErrorMessage message={error} />
          <ProcessMessage message={process} />

          {validationMessages.map(({ msg, type }, index) => {
            return <ActionResultMessage msg={msg} type={type} key={index} />;
          })}

          <input ref={register()} type="hidden" name="_csrf" value={csrfToken} />

          <SingupButton isDisabled={process} />
        </section>
      </form>
    );
  } else {
    return <Loader width={100} height={100} />;
  }
};

export default Form;
