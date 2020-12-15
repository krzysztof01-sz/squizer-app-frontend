import { useEffect } from 'react';
import Header from '../../global/Components/Header';
import Footer from '../../global/Components/Footer';
import Form from './Form/index';

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
