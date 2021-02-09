import { renderAvatar } from '../helpers/renderAvatar';
import './styles.scss';

const RankingItem = ({ place, user: { nickname, points, avatar }, loading }) => {
  return (
    <section className="rankingList__item">
      <span className="item__data">{`${place}. ${nickname} (${points} points)`}</span>
      {renderAvatar(loading, avatar)}
    </section>
  );
};

export default RankingItem;
