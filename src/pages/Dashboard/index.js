import Header from '../../global/Header/Header';
import Footer from '../../global//Footer/Footer';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../api/userAPI';
import Loader from '../../global/Loader/Loader';

import Nav from './Nav';
import QuizzesList from './QuizzesList';
import SearchBar from './SearchBar';
import DashboardHeader from './DashboardHeader';

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
