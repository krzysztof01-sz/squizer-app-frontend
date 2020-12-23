import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import * as fb from '../../../utils/feedbackMessages';
import * as api from '../../../api/index';

import Input from '../../../global/Components/Input/index';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';
import InputValidation from '../../../global/Components/Messages/InputValidationMessage/index';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import LoginButton from '../../../global/Buttons/Login/index';
import Loader from '../../../global/Components/Loader/index';

import { AuthContext } from '../../../contexts/Auth';
import { responseTypes } from '../../../utils/constants';

import '../../../styles/global/Components/Form.scss';
import './styles.scss';

const Form = () => {
  const { setIsLogged } = useContext(AuthContext);
  const [process, setProcess] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);
  const [csrfToken, setCsrfToken] = useState(null);

  const schema = yup.object().shape({
    nickname: yup.string().trim().min(3, fb.NICKNAME_SHORT).max(15, fb.NICKNAME_LONG).required(fb.NICKNAME_REQUIRED),
    password: yup.string().trim().min(8, fb.PASSWORD_SHORT).max(15, fb.PASSWORD_LONG).required(fb.PASSWORD_REQUIRED),
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
    setValidationMessages([]);

    setProcess(fb.LOGGING_PROCESS);
    const loginUserResponse = await api.loginUser(formData, csrfToken);
    setProcess('');

    const { msg, type } = loginUserResponse;

    if (type === responseTypes.success) {
      const { token } = loginUserResponse;
      localStorage.setItem('isLogged', true);
      localStorage.setItem('auth-token', token);
      setValidationMessages(msg);
      setIsLogged(true);
    } else {
      setValidationMessages(msg);
    }
  };

  if (csrfToken) {
    return (
      <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
        <section className="form">
          <header className="form__header">Login form</header>
          <Input labelName="nickname" register={register({ required: true })} type="text" name="nickname" min="3" max="15" />
          <InputValidation message={errors.nickname?.message} />

          <Input labelName="password" register={register({ required: true })} type="password" name="password" min="8" max="15" />
          <InputValidation message={errors.password?.message} />

          <ProcessMessage message={process} />

          {validationMessages.map(({ msg, type }, index) => {
            return <ActionResultMessage key={index} type={type} msg={msg} />;
          })}

          <input type="hidden" ref={register()} name="_csrf" value={csrfToken} />

          <LoginButton isDisabled={process} />
        </section>
      </form>
    );
  } else {
    return <Loader width={100} height={100} />;
  }
};

export default Form;
