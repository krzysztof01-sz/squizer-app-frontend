import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/User';
import * as api from '../api';
import axios from 'axios';

export const useUserProfile = () => {
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    (async () => {
      const rankingPlaceQuery = await api.getUserRankingPlace(user._id);
      const userQuizzesQuery = await api.getUserQuizzes(user._id);

      const { data: rankingPlace } = rankingPlaceQuery;
      const { data: quizzes } = userQuizzesQuery;

      setProfile({ ...user, rankingPlace, quizzes });
      setLoading(false);
    })();

    return () => source.cancel();
  }, []);

  return { profile, loading };
};
