import Layout from '../../global/Components/Layout';
import ErrorPage from '../ErrorPage';
import Loader from '../../global/Components/Loader';
import Chart from './Chart';
import RankingHeader from './RankingHeader';
import RankingList from './RankingList';
import { useUsers } from '../../hooks';
import './index.scss';

const Ranking = () => {
  const { users, error, loading } = useUsers();

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  return (
    <Layout>
      <section className="statsWrapper">
        <section className="chartWrapper">
          <RankingHeader>Top players 🏆</RankingHeader>
          <Chart users={users} />
        </section>

        <section className="rankingWrapper">
          <RankingHeader>Global ranking</RankingHeader>
          <RankingList users={users} />
        </section>
      </section>
    </Layout>
  );
};

export default Ranking;
