import { memo, useEffect } from 'react';
import RankingDataWrapper from '../helpers/RankingDataWrapper';
import RankingItem from '../RankingItem';
import { emojiCupsMap as emojiCups } from '../../../utils/constants';
import './styles.scss';

const RankingList = ({ users }) => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.bar__line').forEach((el) => el.classList.add('animate'));
    }, 500);
  });

  return (
    <section className="rankingList">
      {users.map((user, place) => {
        place++;

        return (
          <RankingDataWrapper key={user._id} user={user}>
            {({ user, loading }) => {
              const isUserTop3 = place >= 1 && place <= 3;
              if (isUserTop3) place = `${emojiCups.get(place)} ${place}`;

              return <RankingItem place={place} user={user} loading={loading} />;
            }}
          </RankingDataWrapper>
        );
      })}
    </section>
  );
};

export default memo(RankingList);
