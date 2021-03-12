import { useState } from 'react';
import Layout from '../../global/Components/Layout';
import Avatar from './Avatar';
import ChangeAvatarButton from './ChangeAvatarButton';
import CorrectAnswersBar from './CorrectAnswersBar';
import Greeting from './Greeting';
import Stats from './Stats';
import UserQuizzesList from './UserQuizzesList';
import { useUserProfile } from '../../hooks';
import Loader from '../../global/Components/Loader';
import ErrorPage from '../ErrorPage';
import SectionHeader from '../../global/Components/SectionHeader';
import ChangeAvatarModal from './ChangeAvatarModal';
import { photoTypes } from '../../utils/constants';
import './index.scss';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, error, loading } = useUserProfile();

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  const { stats } = user;

  return (
    <Layout>
      <main className="pageWrapper">
        <ChangeAvatarModal
          shouldDefaultOptionRender={user.avatarType === photoTypes.custom}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          userId={user._id}
        />

        <section className="page__firstPart">
          <Greeting name={user.nickname} />

          <section className="userData">
            <div className="userData__profile">
              <Avatar userId={user._id} />
              <ChangeAvatarButton onClickCallback={() => setIsModalOpen(!isModalOpen)} />
            </div>
            <Stats rankingPlace={user.rankingPlace} points={user.stats.correctAnswers} />
          </section>

          <CorrectAnswersBar
            givenAnswersQuantity={stats.givenAnswers}
            correctAnswersQuantity={stats.correctAnswers}
          />
        </section>

        <section className="page__secondPart">
          {user.quizzes?.length === 0 ? (
            <SectionHeader isCenter={true}>You haven't created any quizzes yet.</SectionHeader>
          ) : (
            <UserQuizzesList userQuizzes={user.quizzes} />
          )}
        </section>
      </main>
    </Layout>
  );
};

export default UserProfile;
