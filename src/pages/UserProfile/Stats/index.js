import './styles.scss';

const Stats = ({ rankingPlace, usersQuantity, points }) => {
  return (
    <div className="userData__stats">
      <p>
        Ranking: {rankingPlace}/{usersQuantity}
      </p>
      <p>{points} points</p>
    </div>
  );
};

export default Stats;
