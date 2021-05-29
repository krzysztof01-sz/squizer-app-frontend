import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SingupButton from '../../../global/Buttons/Signup';
import DefaultAvatar from '../../../global/Buttons/DefaultAvatar';
import AvatarPreview from '../../../global/Components/AvatarPreview';
import Input from '../../../global/Components/Input';
import FileInput from '../../../global/Components/FileInput';
import FilenameLabel from '../FilenameLabel';
import Loader from '../../../global/Components/Loader';

import InputValidation from '../../../global/Components/Messages/InputValidationMessage';
import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';

import { photoTypes } from '../../../utils/constants';
import SectionHeader from '../../../global/Components/SectionHeader';
import { useFileInput } from '../../../hooks/useFileInput';
import { useFetching } from '../../../hooks/useFetching';
import { useAuth } from '../../../hooks/useAuth';
import * as fb from '../../../utils/feedbackMessages';
import * as api from '../../../api';
import './styles.scss';

const Form = () => {
  const { data: csrfToken } = useFetching(api.getCsrfToken);
  const { avatar, preview, setDefaultAvatar, handleAvatarChange, error, setError, process } = useFileInput();
  const { registerUser, process: registrationProcess, validationMessages } = useAuth();

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

  const onSubmit = (formData) => {
    formData.avatar = avatar;
    formData.avatarType = avatar?.name ? photoTypes.custom : photoTypes.default;

    if (!formData.avatar) return setError(fb.CHOOSE_YOUR_AVATAR);

    registerUser(formData);
  };

  if (!csrfToken) return <Loader width={100} height={100} />;

  return (
    <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
      <section className="form">
        <SectionHeader isCenter={true}>Registration form</SectionHeader>

        <Input labelName="nickname" register={register({ required: true })} type="text" name="nickname" min="3" max="15" />
        <InputValidation message={errors.nickname?.message} />

        <Input labelName="password" register={register({ required: true })} type="password" name="password" min="8" max="15" />
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

        <AvatarPreview preview={preview} />
        <FilenameLabel avatar={avatar} />

        <div className="fileInputWrapper">
          <FileInput handleChange={handleAvatarChange} />
          <DefaultAvatar handleClick={setDefaultAvatar} />
        </div>

        <ErrorMessage message={error} />
        <ProcessMessage message={process || registrationProcess} />

        {validationMessages.map(({ msg, type }, index) => {
          return <ActionResultMessage msg={msg} type={type} key={index} />;
        })}

        <input ref={register()} type="hidden" name="_csrf" value={csrfToken} />
        <SingupButton isDisabled={process} />
      </section>
    </form>
  );
};

export default Form;
