import Header from '../../global/Components/Header';
import Footer from '../../global/Components/Footer';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../api/userAPI';
import Loader from '../../global/Components/Loader';

import Nav from './Nav/index';
import QuizzesList from './QuizzesList/index';
import SearchBar from './SearchBar/index';
import DashboardHeader from './DashboardHeader/index';

import '../../styles/pages/Dashboard/index.scss';

const Dashboard = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

  useEffect(async () => {
    const isLogged = async () => {
      const [user] = await api.knockTo('dashboard');
      if (!user._id) return setTimeout(() => history.push('/login'), 800);

      setUser(user);
      const quizzes = await api.getQuizzes();
      console.log(quizzes);
      setQuizzes(quizzes);
    };
    isLogged();
  }, []);

  return user && quizzes ? (
    <>
      <Header isLogged={user} />
      <section className="navSearchbarWrapper">
        <Nav />
        <SearchBar />
      </section>
      <DashboardHeader />
      <QuizzesList quizzes={quizzes} />
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Dashboard;
