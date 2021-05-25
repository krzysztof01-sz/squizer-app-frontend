import { memo } from 'react';

import QuizzesList from './QuizzesList';
import SearchBar from './SearchBar';
import DashboardHeader from './DashboardHeader';
import ErrorPage from '../ErrorPage';
import Layout from '../../global/Components/Layout';
import Loader from '../../global/Components/Loader';
import { SearchIcon } from '../../global/Icons';
import FilteringProvider from '../../contexts/Filtering';
import { getQuizzes } from '../../api';
import { useFetching } from '../../hooks/useFetching';
import './index.scss';

const Dashboard = () => {
  const { data: quizzes, loading, error } = useFetching(getQuizzes);

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  return (
    <Layout>
      <FilteringProvider>
        <section className="navSearchbarWrapper">
          <SearchBar>
            {(filterQuizzes) => {
              return (
                <div className="searchBarWrapper">
                  <label className="label">
                    <input
                      aria-label="search a quiz"
                      type="text"
                      className="input searchBar"
                      placeholder="search..."
                      onChange={(e) => filterQuizzes(e)}
                    />
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
