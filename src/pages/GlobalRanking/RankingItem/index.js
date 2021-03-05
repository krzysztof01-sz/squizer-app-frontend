import { renderAvatar } from '../helpers/renderAvatar';
import './styles.scss';

const RankingItem = ({ place, user: { nickname, stats, avatar, isItMe }, loading }) => {
  const points = stats.correctAnswers;

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
