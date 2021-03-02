import { renderAvatar } from '../helpers/renderAvatar';
import './styles.scss';

const RankingItem = ({ place, user: { nickname, points, avatar, isItMe }, loading }) => {
  return (
    <section className="rankingList__item">
      <span
        className={`item__data ${isItMe ? 'item__data--authUser' : ''}`}
      >{`${place}. ${nickname} (${points} points)`}</span>
      {renderAvatar(loading, avatar)}
    </section>
  );
};

export default RankingItem;
