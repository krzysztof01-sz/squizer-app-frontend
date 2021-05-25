import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/User';
import * as api from '../api';

export const useUserProfile = () => {
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const rankingPlaceQuery = await api.getUserRankingPlace(user._id);
      const userQuizzesQuery = await api.getUserQuizzes(user._id);

      const { data: rankingPlace } = rankingPlaceQuery;
      const { data: quizzes } = userQuizzesQuery;

      setProfile({ ...user, rankingPlace, quizzes });
      setLoading(false);
    })();
  }, []);

  return { profile, loading };
};
