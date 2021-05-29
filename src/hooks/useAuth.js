import { useContext, useState } from 'react';
import * as api from '../api';
import * as fb from '../utils/feedbackMessages';
import { useHistory } from 'react-router-dom';
import { photoTypes, responseTypes } from '../utils/constants';
import { UserContext } from '../contexts/User';

export const useAuth = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const [process, setProcess] = useState('');
  const [validationMessages, setValidationMessages] = useState([]);

  const loginUser = async (formData) => {
    setValidationMessages([]);

    setProcess(fb.LOGGING_PROCESS);
    const { msg, type, user } = await api.loginUser(formData);
    setProcess('');

    if (type === responseTypes.success) {
      setValidationMessages(msg);
      setUser(user);
      history.push('/dashboard');
    } else {
      setValidationMessages(msg);
    }
  };

  const registerUser = async (formData) => {
    setValidationMessages([]);

    setProcess(fb.REGISTERING_PROCESS);
    const { type, msg, userId } = await api.registerUser(formData);
    setProcess('');

    if (type === responseTypes.success) {
      if (formData.avatarType === photoTypes.custom) await api.addUserAvatar(userId, formData.avatar);

      setValidationMessages(msg);
      setTimeout(() => history.push('/login'), 300);
    } else {
      setValidationMessages(msg);
    }
  };

  const logoutUser = async () => {
    if (confirm(fb.LOGOUT_CONFIRMATION)) {
      const { success } = await api.logoutUser();
      if (success) {
        localStorage.clear();
        location.assign('/login');
      }
    } else {
      return false;
    }
  };

  const refetchUser = async () => {
    const { data } = await api.refetchUser();
    setUser(data);
    if (data) {
      history.push(localStorage.getItem('current-route'));
    }
  };

  return { loginUser, registerUser, logoutUser, refetchUser, process, validationMessages };
};
