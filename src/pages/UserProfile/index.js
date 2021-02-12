import Layout from '../../global/Components/Layout';
import Avatar from './Avatar';
import ChangeAvatarButton from './ChangeAvatarButton';
import CorrectAnswersBar from './CorrectAnswersBar';
import Greeting from './Greeting';
import Stats from './Stats';
import UserQuizzesList from './UserQuizzesList';
import './index.scss';

import DefaultAvatar from '../../assets/images/DefaultAvatar.png';

const UserProfile = () => {
  return (
    <Layout>
      <main className="pageWrapper">
        <section className="page__firstPart">
          <Greeting name="Krzysiek" />

          <section className="userData">
            <div className="userData__profile">
              <Avatar src={DefaultAvatar} />
              <ChangeAvatarButton />
            </div>
            <Stats rankingPlace={4} usersQuantity={20} points={100} />
          </section>

          <CorrectAnswersBar percent={60} />
        </section>

        <section className="page__secondPart">
          <UserQuizzesList />
        </section>
      </main>
    </Layout>
  );
};

export default UserProfile;
