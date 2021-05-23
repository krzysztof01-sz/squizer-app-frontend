import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import * as fb from '../../../utils/feedbackMessages';
import * as api from '../../../api';

import Input from '../../../global/Components/Input';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';
import InputValidation from '../../../global/Components/Messages/InputValidationMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import LoginButton from '../../../global/Buttons/Login';
import Loader from '../../../global/Components/Loader';
import SectionHeader from '../../../global/Components/SectionHeader';

import { useCsrfToken } from '../../../hooks';
import { UserContext } from '../../../contexts/User';
import { responseTypes } from '../../../utils/constants';
import '../../../styles/global/Components/Form.scss';
import './styles.scss';

const Form = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { csrfToken } = useCsrfToken();
  const [process, setProcess] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);

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

  const onSubmit = async (formData) => {
    setValidationMessages([]);

    setProcess(fb.LOGGING_PROCESS);
    const loginUserResponse = await api.loginUser(formData);
    setProcess('');

    const { msg, type } = loginUserResponse;

    if (type === responseTypes.success) {
      setValidationMessages(msg);
      setUser(loginUserResponse.user);
      history.push('/dashboard');
    } else {
      setValidationMessages(msg);
    }
  };

  if (!csrfToken) return <Loader width={100} height={100} />;
  return (
    <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
      <section className="form">
        <SectionHeader isCenter={true}>Login form</SectionHeader>

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
};

export default Form;
