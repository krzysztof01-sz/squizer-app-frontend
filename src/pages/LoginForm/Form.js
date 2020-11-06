import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../global/Components/Input';
import Status from '../global/Components/Status';
import * as messages from '../../utils/feedbackMessages';
import InputValidation from '../global/Components/InputValidationMessage';
import * as api from '../../api/userAPI';
import FeedbackMessage from '../global/Components/FeedbackMessage';
import LoginButton from '../global/Buttons/LoginButton';
import { getRandomNumber } from '../../../../backend/utils/functions';
import Loader from '../global/Loader/Loader';

const Form = () => {
  const history = useHistory();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');
  const [feedbackMessages, setFeedbackMessages] = useState([]);
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
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(async () => {
    const token = await api.getToken();
    setCsrfToken(token);
  }, []);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setStatus(messages.LOGGING_STATUS);

    const loggingUserResponse = await api.loginUser(formData, csrfToken);
    const { type: responseType, token: jwtToken } = loggingUserResponse[0];
    localStorage.setItem('auth-token', jwtToken);

    setIsSubmitting(false);
    setStatus('');
    setFeedbackMessages(loggingUserResponse);

    if (responseType === 'success') {
      const authentication = await api.knockTo('dashboard', localStorage.getItem('aut-token'));
      if (!authentication) {
        setFeedbackMessages([{ msg: messages.JWT_ACCESS_DENIED, param: getRandomNumber(), type: 'error' }]);
      } else {
        // authenticated user is in auth-token in localStorage
        history.push('/dashboard');
      }
    }
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

        <Status message={status} />

        {feedbackMessages.map(({ msg, type }, param) => {
          return <FeedbackMessage key={param} type={type} message={msg} />;
        })}

        <input type="hidden" name="_csrf" value={csrfToken} />

        <LoginButton isDisabled={isSubmitting} />
      </form>
    );
  } else {
    return <Loader />;
  }
};

export default Form;
