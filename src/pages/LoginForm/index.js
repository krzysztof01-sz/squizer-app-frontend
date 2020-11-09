import { useEffect } from 'react';
import Header from '../global/Header/Header';
import Footer from '../global/Footer/Footer';
import Form from './Form';

const LoginForm = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <Header />
      <Form />
      <Footer />
    </>
  );
};

export default LoginForm;
