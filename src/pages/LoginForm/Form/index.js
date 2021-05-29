import { useForm } from 'react-hook-form';
import Input from '../../../global/Components/Input';
import ProcessMessage from '../../../global/Components/Messages/ProcessMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import LoginButton from '../../../global/Buttons/Login';
import Loader from '../../../global/Components/Loader';
import SectionHeader from '../../../global/Components/SectionHeader';
import { useFetching } from '../../../hooks/useFetching';
import { getCsrfToken } from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import '../../../styles/global/Components/Form.scss';
import './styles.scss';

const Form = () => {
  const { data: csrfToken } = useFetching(getCsrfToken);
  const { loginUser, process, validationMessages } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nickname: '',
      password: '',
      csrf: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (formData) => loginUser(formData);

  if (!csrfToken) return <Loader width={100} height={100} />;

  return (
    <form method="POST" className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
      <section className="form">
        <SectionHeader isCenter={true}>Login form</SectionHeader>

        <Input labelName="nickname" register={register({ required: true })} type="text" name="nickname" min="3" max="15" />
        <Input labelName="password" register={register({ required: true })} type="password" name="password" min="8" max="15" />
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
