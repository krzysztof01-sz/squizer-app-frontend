import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import DefaultPhoto from '../../assets/images/DefaultPhoto.png';
import * as messages from '../../utils/feedbackMessages';
import { isFileImage, compressPhoto, savePhotoInDB } from '../../utils/functions';

import SingupButton from '../global/Buttons/SignupButton';
import FeedbackMessage from '../global/Components/FeedbackMessage';
import PhotoPreview from './PhotoPreview';
import ErrorMessage from '../global/Components/ErrorMessage';
import Input from '../global/Components/Input';
import InputValidation from '../global/Components/InputValidationMessage';
import FileInput from './FileInput';
import Status from '../global/Components/Status';
import FilenameLabel from './FileNameLabel';
import * as api from '../../api/userAPI';
import DefaultPhotoButton from './DefaultPhotoButton';
import Loader from '../global/Loader/Loader';

const Form = () => {
  const history = useHistory();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [userPhoto, setUserPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

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
    const { type: responseType, id: createdUserId, nick: createdUserNick } = addingUserResponse[0];
    setIsProcessing(false);

    setFeedbackMessages(addingUserResponse);

    if (responseType === 'success') {
      const photoName = `${createdUserId}-${createdUserNick}`;
      const addingResult = userPhoto?.name ? await savePhotoInDB(userPhoto, photoName) : 'success';

      if (addingResult === 'success') {
        setStatus(messages.PHOTO_SAVED_IN_DB);
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
    setStatus(messages.PHOTO_COMPESSING_START);
    setIsProcessing(true);

    const compressedPhoto = await compressPhoto(file);

    setIsProcessing(false);
    setStatus('');

    if (!compressedPhoto) return setError(messages.PHOTO_COMPRESSING_ERROR);

    showPhoto(file);
    setUserPhoto(compressedPhoto);
  };

  if (csrfToken) {
    return (
      <form method="POST" className="form" onSubmit={handleSubmit(onSubmit)}>
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
        <Status message={status} />

        <FileInput handleChange={handlePhotoChange} />
        <FilenameLabel userPhoto={userPhoto} />
        <PhotoPreview preview={preview} />

        <DefaultPhotoButton handleClick={setDefaultPhoto} />
        <ErrorMessage message={error} />

        {feedbackMessages.map(({ msg, type }, param) => {
          return <FeedbackMessage key={param} type={type} message={msg} />;
        })}

        <input type="hidden" name="_csrf" value={csrfToken} />

        <SingupButton isDisabled={isProcessing} />
      </form>
    );
  } else {
    return <Loader />;
  }
};

export default Form;
