import './styles.scss';

const formatPlace = (place) => {
  if (place === 1) return `${place}st`;
  if (place === 2) return `${place}nd`;
  if (place === 3) return `${place}rd`;
  return `${place}th`;
};

const Stats = ({ rankingPlace, points }) => {
  return (
    <div className="userData__stats">
      <p>Ranking: {`${formatPlace(rankingPlace)} place`}</p>
      <p>Scored points: {points}</p>
    </div>
  );
};

export default Stats;
