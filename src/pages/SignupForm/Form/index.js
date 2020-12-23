import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as api from '../../../api/index';
import * as fb from '../../../utils/feedbackMessages';
import DefaultPhoto from '../../../assets/images/DefaultPhoto.png';
import { isFileImage, compressPhoto, savePhotoInDB } from '../../../utils/functions';

import SingupButton from '../../../global/Buttons/Signup/index';
import DefaultPhotoButton from '../DefaultPhotoButton/index';
import PhotoPreview from '../PhotoPreview/index';
import Input from '../../../global/Components/Input/index';
import FileInput from '../FileInput/index';
import FilenameLabel from '../FilenameLabel/index';
import Loader from '../../../global/Components/Loader/index';

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
  const [userPhoto, setUserPhoto] = useState(null);
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

    formData.photo = userPhoto;
    formData.photoType = userPhoto?.name ? 'custom' : 'default';
    if (!formData.photo) return setError(fb.CHOOSE_YOUR_PHOTO);

    setProcess(fb.REGISTERING_PROCESS);
    const addingUserResponse = await api.registerUser(formData, csrfToken);
    setProcess('');

    if (addingUserResponse.type === responseTypes.success) {
      const { msg, userId } = addingUserResponse;
      if (formData.photoType === 'custom') await savePhotoInDB(userPhoto, userId);
      setValidationMessages(msg);
      setTimeout(() => history.push('/login'), 500);
    } else {
      const { msg } = addingUserResponse;
      setValidationMessages(msg);
    }
  };

  const showPhoto = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setPreview(this.result);
    });
    reader.readAsDataURL(file);
  };

  const setDefaultPhoto = (e) => {
    e.preventDefault();
    setError('');
    setUserPhoto('defaultPhoto');
    setPreview(DefaultPhoto);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!isFileImage(file)) {
      setError(fb.PHOTO_EXTENSION_ERROR);
      setUserPhoto(null);
      setPreview(null);
      return false;
    }

    setError('');

    setProcess(fb.PHOTO_COMPESSING_START);
    const compressedPhoto = await compressPhoto(file);
    setProcess('');

    if (!compressedPhoto) return setError(fb.PHOTO_COMPRESSING_ERROR);
    showPhoto(file);
    setUserPhoto(compressedPhoto);
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

          <PhotoPreview preview={preview} />
          <FilenameLabel userPhoto={userPhoto} />

          <div className="fileInputWrapper">
            <FileInput handleChange={handlePhotoChange} />
            <DefaultPhotoButton handleClick={setDefaultPhoto} />
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
