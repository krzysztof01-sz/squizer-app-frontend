import { useContext, useState } from 'react';
import SendButton from './SendButton';
import Star from './Star';
import * as api from '../../../api';
import './styles.scss';
import { responseTypes } from '../../../utils/constants';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';
import { useParams } from 'react-router';
import { UserContext } from '../../../contexts/User';
import { getStarsRenderingOrder } from '../../../utils/functions';
import AccessibleWrapper from '../../../global/AccessibleWrapper';

const RatingCard = () => {
  const [rating, setRating] = useState(undefined);
  const [actionResult, setActionResult] = useState(undefined);
  const [isSending, setIsSending] = useState(false);
  const { quizId } = useParams();
  const {
    user: { _id: userId },
  } = useContext(UserContext);

  return (
    <section className="ratingCard">
      {actionResult?.type === responseTypes.success || (
        <>
          <p className="ratingCard__question">How would you rate this quiz?</p>
          <div className="ratingCard__starsBox" role="list">
            {getStarsRenderingOrder(rating).map(({ isLightStar: isLight, id }) => (
              <AccessibleWrapper key={id}>
                <Star isLight={isLight} key={id} callback={() => setRating(id)} />
              </AccessibleWrapper>
            ))}
          </div>
        </>
      )}

      {rating >= 0 && (
        <SendButton
          isDisabled={isSending}
          callback={async () => {
            const userRating = rating;

            setIsSending(true);
            const { type, msg } = await api.sendQuizRating(quizId, { userId, rating: userRating });
            setIsSending(false);

            setActionResult({ type, msg });

            if (type === responseTypes.success) {
              // dissapear this button after successful operation
              setRating(undefined);
            }
          }}
        />
      )}

      <ActionResultMessage type={actionResult?.type} msg={actionResult?.msg} />
    </section>
  );
};

export default RatingCard;
