import { useState } from 'react';
import Layout from '../../global/Components/Layout';
import Avatar from './Avatar';
import CorrectAnswersBar from './CorrectAnswersBar';
import Greeting from './Greeting';
import Stats from './Stats';
import UserQuizzesList from './UserQuizzesList';
import { useUserProfile } from '../../hooks/useUserProfile';
import Loader from '../../global/Components/Loader';
import SectionHeader from '../../global/Components/SectionHeader';
import ChangeAvatarModal from './ChangeAvatarModal';
import { photoTypes } from '../../utils/constants';
import ResourceNotFoundImg from '../../assets/images/Resource-not-found.svg';
import './index.scss';
import ChangeAvatarButton from './ChangeAvatarButton';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile: user, loading } = useUserProfile();

  if (loading) return <Loader />;

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

        <section className="firstPart">
          <Greeting name={user.nickname} />

          <section className="userData">
            <div className="userData__profile">
              <Avatar userId={user._id} />
              <ChangeAvatarButton callback={() => setIsModalOpen(!isModalOpen)} />
            </div>
            <Stats rankingPlace={user.rankingPlace} points={user.stats.correctAnswers} />
          </section>

          <CorrectAnswersBar givenAnswersQuantity={stats.givenAnswers} correctAnswersQuantity={stats.correctAnswers} />
        </section>

        <section className="secondPart">
          {user.quizzes?.length === 0 ? (
            <SectionHeader isCenter={true}>
              <p>You haven't created any quizzes yet.</p>
              <img alt="User quizzes not found" src={ResourceNotFoundImg} className="secondPart__errorImg" />
            </SectionHeader>
          ) : (
            <UserQuizzesList userQuizzes={user.quizzes} />
          )}
        </section>
      </main>
    </Layout>
  );
};

export default UserProfile;
