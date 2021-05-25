import { useParams } from 'react-router-dom';
import { useQuizCard } from '../../hooks/useQuizCard';
import Layout from '../../global/Components/Layout';
import PresentationCard from './PresentationCard';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import Loader from '../../global/Components/Loader';
import './styles.scss';
import ErrorPage from '../ErrorPage';
import { useFetching } from '../../hooks/useFetching';
import { getQuizComments } from '../../api';

const AboutQuiz = () => {
  const { quizId } = useParams();
  const { data: comments, loading: commentsLoading } = useFetching(getQuizComments, quizId);
  const { quiz, user, categoryImage, error: cardError, loading: cardLoading } = useQuizCard(quizId);

  if (cardError) return <ErrorPage msg={cardError} />;
  if (commentsLoading || cardLoading) return <Loader />;

  return (
    <Layout>
      <PresentationCard card={{ quiz, user, categoryImage }} />

      <section className="commentsView">
        <CommentForm />
        <CommentsList comments={comments} />
      </section>
    </Layout>
  );
};

export default AboutQuiz;
