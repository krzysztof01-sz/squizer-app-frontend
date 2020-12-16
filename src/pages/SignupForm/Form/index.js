import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import DefaultPhoto from '../../../assets/images/DefaultPhoto.png';
import * as messages from '../../../utils/responseMessages';
import { isFileImage, compressPhoto, savePhotoInDB } from '../../../utils/functions';

import SingupButton from '../../../global/Buttons/Signup/index';
import FeedbackMessage from '../../../global/Components/FeedbackMessage/index';
import PhotoPreview from '../PhotoPreview/index';
import ErrorMessage from '../../../global/Components/ErrorMessage/index';
import Input from '../../../global/Components/Input/index';
import InputValidation from '../../../global/Components/InputValidationMessage/index';
import FileInput from '../FileInput/index';
import ProcessMessage from '../../../global/Components/ProcessMessage/index';
import FilenameLabel from '../FilenameLabel/index';
import DefaultPhotoButton from '../DefaultPhotoButton/index';
import Loader from '../../../global/Components/Loader/index';
import * as api from '../../../api/userAPI';

import './styles.scss';

const Form = () => {
  const history = useHistory();

  const [responseMessages, setResponseMessages] = useState([]);
  const [process, setProcess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('whatever');

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .trim()
      .min(3, messages.NICKNAME_SHORT)
      .max(15, messages.NICKNAME_LONG)
      .required(messages.NICKNAME_REQUIRED),
    password: yup
      .string()
      .trim()
      .min(8, messages.PASSWORD_SHORT)
      .max(15, messages.PASSWORD_LONG)
      .required(messages.PASSWORD_REQUIRED),
    confirmedPassword: yup.string().oneOf([yup.ref('password'), null], messages.DIFFERENT_PASSWORDS),
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
    formData.photo = userPhoto;
    formData.photoType = userPhoto?.name ? 'custom' : 'default';

    if (!formData.photo) return setError(messages.CHOOSE_YOUR_PHOTO);

    setIsProcessing(true);
    const addingUserResponse = await api.addUser(formData, csrfToken);
    const { type: responseType, id: createdUserId } = addingUserResponse[0];
    setIsProcessing(false);

    setResponseMessages(addingUserResponse);

    if (responseType === 'success') {
      const addingResult = userPhoto?.name ? await savePhotoInDB(userPhoto, createdUserId) : 'success';
      if (addingResult === 'success') {
        setProcess(messages.PHOTO_SAVED_IN_DB);
        setTimeout(() => history.push('/login'), 500);
      } else {
        setError(addingResult);
      }
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
      setError(messages.PHOTO_EXTENSION_ERROR);
      setUserPhoto(null);
      setPreview(null);
      return false;
    }

    setError('');
    setProcess(messages.PHOTO_COMPESSING_START);
    setIsProcessing(true);

    const compressedPhoto = await compressPhoto(file);
    setIsProcessing(false);
    setProcess('');

    if (!compressedPhoto) return setError(messages.PHOTO_COMPRESSING_ERROR);
    showPhoto(file);
    setUserPhoto(compressedPhoto);
  };

  if (csrfToken) {
    return (
      <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
        <section className="form">
          <header className="form__header">Registration form</header>
          <Input
            labelName="nickname"
            register={register({ required: true })}
            type="text"
            name="nickname"
            min="3"
            max="15"
          />
          <InputValidation message={errors.nickname?.message} />

          <Input
            labelName="password"
            register={register({ required: true })}
            type="password"
            name="password"
            min="8"
            max="15"
          />
          <InputValidation message={errors.password?.message} />

          <Input
            labelName="confirm the password"
            register={register({ required: true })}
            type="password"
            name="confirmedPassword"
            min="8"
            max="15"
          />
          <InputValidation message={errors.confirmedPassword?.message} />
          <ProcessMessage message={process} />

          <PhotoPreview preview={preview} />

          <FilenameLabel userPhoto={userPhoto} />
          <div className="fileInputWrapper">
            <FileInput handleChange={handlePhotoChange} />
            <DefaultPhotoButton handleClick={setDefaultPhoto} />
          </div>

          <ErrorMessage message={error} />

          {responseMessages.map(({ msg, type }, param) => {
            return <FeedbackMessage key={param} type={type} message={msg} />;
          })}

          <input ref={register()} type="hidden" name="_csrf" value={csrfToken} />

          <SingupButton isDisabled={isProcessing} />
        </section>
      </form>
    );
  } else {
    return <Loader width={100} height={100} />;
  }
};

export default Form;
