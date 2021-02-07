import RankingDataWrapper from '../helpers/RankingDataWrapper';
import RankingItem from '../RankingItem';

const RankingList = ({ users }) => {
  return (
    <section className="rankingList">
      {users.map((user, place) => {
        return (
          <RankingDataWrapper key={user._id} user={user}>
            {({ user, loading }) => {
              return <RankingItem place={place} user={user} loading={loading} />;
            }}
          </RankingDataWrapper>
        );
      })}
    </section>
  );
};

export default RankingList;
