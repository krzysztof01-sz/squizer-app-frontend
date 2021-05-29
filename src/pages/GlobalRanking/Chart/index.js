import { ChartBarIcon } from '../../../global/Icons';
import ChartBar from '../ChartBar';
import RankingDataWrapper from '../helpers/RankingDataWrapper';
import './styles.scss';

const getPercentageHeight = (max, points) => ((points * 100) / max).toFixed(2);
const prefferedChartHeight = 800;

const Chart = ({ users }) => {
  const maxBarHeight = users[0]?.stats?.correctAnswers || prefferedChartHeight;

  return (
    <section className="chart">
      <ChartBarIcon />
      {users.slice(0, 5).map((user) => {
        const points = user.stats.correctAnswers;
        const barHeight = getPercentageHeight(maxBarHeight, points);

        return (
          <RankingDataWrapper key={user._id} user={user}>
            {({ user, loading }) => <ChartBar user={user} loading={loading} barHeight={barHeight} />}
          </RankingDataWrapper>
        );
      })}
    </section>
  );
};

export default Chart;
