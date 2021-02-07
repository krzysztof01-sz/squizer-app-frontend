import ChartBar from '../ChartBar';
import RankingDataWrapper from '../helpers/RankingDataWrapper';

const getPercentageHeight = (max, points) => ((points * 100) / max).toFixed(2);
const prefferedChartHeight = 800;

const Chart = ({ users }) => {
  const maxBarHeight = users[0]?.points || prefferedChartHeight;

  return (
    <section className="chart">
      {users.slice(0, 5).map((user) => {
        const barHeight = getPercentageHeight(maxBarHeight, user.points);

        return (
          <RankingDataWrapper key={user._id} user={user}>
            {({ user, loading }) => (
              <ChartBar user={user} loading={loading} barHeight={barHeight} />
            )}
          </RankingDataWrapper>
        );
      })}
    </section>
  );
};

export default Chart;
