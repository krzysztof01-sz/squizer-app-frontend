import { useEffect } from 'react';
import Header from '../../global/Components/Header/index';
import Footer from '../../global/Components/Footer/index';
import Form from './Form/index';

const SignupForm = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <Header />
      <Form />
      <Footer />
    </>
  );
};

export default SignupForm;
