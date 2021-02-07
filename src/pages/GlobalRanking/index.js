import Layout from '../../global/Components/Layout';
import ErrorPage from '../ErrorPage';
import Loader from '../../global/Components/Loader';
import Chart from './Chart';
import RankingHeader from './RankingHeader.js';
import RankingList from './RankingList';
import { useUsers } from '../../hooks';
import './index.scss';

const Ranking = () => {
  const { users, error, loading } = useUsers();

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  return (
    <Layout>
      <section className="rankingWrapper">
        <RankingHeader>Top players 🏆</RankingHeader>
        <Chart users={users} />

        <RankingHeader>Global ranking</RankingHeader>
        <RankingList users={users} />
      </section>
    </Layout>
  );
};

export default Ranking;
