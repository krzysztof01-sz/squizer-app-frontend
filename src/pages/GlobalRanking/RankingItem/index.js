import { renderAvatar } from '../helpers/renderAvatar';

const RankingItem = ({ place, user: { nickname, points, avatar }, loading }) => {
  return (
    <section className="rankingList__item">
      <span className="item__data">{`${place + 1}. ${nickname} (${points} points)`}</span>
      {renderAvatar(loading, avatar)}
    </section>
  );
};

export default RankingItem;
