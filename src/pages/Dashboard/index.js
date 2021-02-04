import { memo } from 'react';

import Nav from './Nav';
import QuizzesList from './QuizzesList';
import SearchBar from './SearchBar';
import DashboardHeader from './DashboardHeader';
import ErrorPage from '../ErrorPage';
import Layout from '../../global/Components/Layout';
import Loader from '../../global/Components/Loader';
import { SearchIcon } from '../../global/Icons';
import FilteringProvider from '../../contexts/Filtering';

import { useQuizzes } from '../../hooks';
import './index.scss';

const Dashboard = () => {
  const { quizzes, loading, error } = useQuizzes();

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
