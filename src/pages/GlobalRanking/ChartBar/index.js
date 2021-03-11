import { shortenText } from '../../../utils/functions';
import { renderAvatar } from '../helpers/renderAvatar';
import './styles.scss';

const ChartBar = ({ user: { nickname, stats, avatar }, loading, barHeight }) => {
  const points = stats.correctAnswers;

  return (
    <div className="chart__bar">
      <div className="chart__lineWrapper">
        <div style={{ height: `${barHeight}%` }} className="bar__line">
          <p aria-label={`user ${nickname} got ${points} points`} className="chart__bar-points">
            {points} pt
          </p>
        </div>
      </div>

      <div className="bar__data">
        {renderAvatar(loading, avatar)}
        <p className="data__nickname">{shortenText(nickname, 8)}</p>
      </div>
    </div>
  );
};

export default ChartBar;
