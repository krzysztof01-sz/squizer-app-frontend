import { useEffect, useState, memo } from 'react';
import * as api from '../../api/index';

import Nav from './Nav/index';
import QuizzesList from './QuizzesList/index';
import SearchBar from './SearchBar/index';
import DashboardHeader from './DashboardHeader/index';
import ErrorPage from '../ErrorPage';
import Layout from '../../global/Components/Layout/index';
import Loader from '../../global/Components/Loader/index';
import { SearchIcon } from '../../global/Icons/index';

import './index.scss';
import { responseTypes } from '../../utils/constants';
import FilteringProvider from '../../contexts/Filtering';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getQuizzes = async () => {
      const response = await api.getQuizzes();
      const { type } = response;
      if (type === responseTypes.success) {
        const { quizzes } = response;
        setQuizzes(quizzes);
      } else {
        const { msg } = response;
        setError(msg);
      }
      setLoading(false);
    };
    getQuizzes();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  return (
    <Layout>
      <FilteringProvider>
        <section className="navSearchbarWrapper">
          <Nav />
          <SearchBar>
            {(filterQuizzes) => {
              return (
                <div className="searchBarWrapper">
                  <label className="label">
                    <input type="text" className="input searchBar" placeholder="search..." onChange={(e) => filterQuizzes(e)} />
                    <SearchIcon />
                  </label>
                </div>
              );
            }}
          </SearchBar>
        </section>
        <DashboardHeader />
        <QuizzesList quizzes={quizzes} />
      </FilteringProvider>
    </Layout>
  );
};

export default memo(Dashboard);
