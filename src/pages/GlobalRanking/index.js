import Layout from '../../global/Components/Layout';
import ErrorPage from '../ErrorPage';
import Loader from '../../global/Components/Loader';
import Chart from './Chart';
import RankingList from './RankingList';
import SectionHeader from '../../global/Components/SectionHeader';
import { useFetching } from '../../hooks/useFetching';
import { getUsers } from '../../api';
import './index.scss';

const Ranking = () => {
  const { data: users, loading, error } = useFetching(getUsers);

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  return (
    <Layout>
      <section className="statsWrapper">
        <section className="chartWrapper">
          <SectionHeader>Top players 🏆</SectionHeader>
          <Chart users={users} />
        </section>

        <section aria-label="user ranking" className="rankingWrapper">
          <SectionHeader>Global ranking</SectionHeader>
          <RankingList users={users} />
        </section>
      </section>
    </Layout>
  );
};

export default Ranking;
