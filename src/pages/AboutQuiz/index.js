import { useParams } from 'react-router-dom';
import { useQuizCard, useQuizComments } from '../../hooks';
import Layout from '../../global/Components/Layout';
import PresentationCard from './PresentationCard';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import Loader from '../../global/Components/Loader';
import './styles.scss';
import ErrorPage from '../ErrorPage';

const AboutQuiz = () => {
  const { quizId } = useParams();
  const { comments, error: commentError, loading: commentsLoading } = useQuizComments(quizId);
  const { quiz, user, categoryImage, error: cardError, loading: cardLoading } = useQuizCard(quizId);

  if (cardError) return <ErrorPage msg={cardError} />;
  if (commentError) return <ErrorPage msg={commentError} />;
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
