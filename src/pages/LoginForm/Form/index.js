import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../../../global/Components/Input/index';
import ProcessMessage from '../../../global/Components/ProcessMessage/index';
import InputValidation from '../../../global/Components/InputValidationMessage/index';
import FeedbackMessage from '../../../global/Components/FeedbackMessage/index';
import LoginButton from '../../../global/Buttons/Login/index';
import Loader from '../../../global/Components/Loader/index';
import * as messages from '../../../utils/responseMessages';
import * as api from '../../../api/userAPI';

import '../../../styles/global/Components/Form.scss';
import './styles.scss';

const Form = () => {
  const history = useHistory();
  const [process, setProcess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');
  const [responseMessages, setResponseMessages] = useState([]);
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
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nickname: '',
      password: '',
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
    setIsSubmitting(true);
    setProcess(messages.LOGGING_PROCESS);

    const loggingUserResponse = await api.loginUser(formData, csrfToken);
    const { type: responseType, token: jwtToken } = loggingUserResponse[0];
    localStorage.setItem('auth-token', jwtToken);

    setProcess('');
    setIsSubmitting(false);
    setResponseMessages(loggingUserResponse);

    if (responseType === 'success') {
      const authentication = await api.knockTo('dashboard');
      console.log(authentication);
      const [{ type: responseType }] = authentication;
      if (responseType === 'error') {
        setResponseMessages(authentication);
      } else {
        // authenticated user is in auth-token in localStorage
        history.push('/dashboard');
      }
    }
  };

  if (csrfToken) {
    return (
      <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
        <section className="form">
          <header className="form__header">Login form</header>
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

          <ProcessMessage message={process} />

          {responseMessages.map(({ msg, type }, param) => {
            return <FeedbackMessage key={param} type={type} message={msg} />;
          })}

          <input type="hidden" ref={register()} name="_csrf" value={csrfToken} />

          <LoginButton isDisabled={isSubmitting} />
        </section>
      </form>
    );
  } else {
    return <Loader width={100} height={100} />;
  }
};

export default Form;
