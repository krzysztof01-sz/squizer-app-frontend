import Layout from '../../global/Components/Layout';
import './index.scss';

const About = () => {
  return (
    <Layout>
      <main className="wrapper">
        <h2 className="header">About sQuizer</h2>
        <h2 className="header">Implemented features</h2>
        <ul className="list">
          <li className="list__item">Login and registration</li>
          <li className="list__item">JWT + cookie based security</li>
          <li className="list__item">Basic Accessibility</li>
          <li className="list__item">Quizzes creating and deleting</li>
          <li className="list__item">Scoring and user ranking system</li>
          <li className="list__item">Comments adding</li>
          <li className="list__item">Avatar updating</li>
        </ul>

        <h2 className="header">Why did I create sQuizer?</h2>
        <p>
          In my previous project
          <a className="link" href="https://github.com/krzysztof01-sz/csale-react-olx-clone">
            <i>(Csale)</i>
          </a>{' '}
          I was working with firebase. I turned out to be a really powerful technology but I was a
          bit disgusted that I didn't know how it works. I mean I knew nothing about authentication,
          security and working with backend. So in order to learn it I decided to create a small
          project which later became more complex. Finally, I've learned a lot of thing doing this
          project so I achieved my basic goal.
        </p>

        <h2 className="header">Am I planning to add new features?</h2>
        <p>
          Yes, I'm planning to add better authentication because now I still use partially
          localStorage for handling user authentication on the frontend side (backend has
          cookie-based auth) or totally change it on cookie + session. Also comments deleting and
          random quiz generation. But I don't guarantee that I'll be done in 100% 😄.
        </p>

        <h2 className="header">If you want to check my github repos:</h2>
        <ul className="list">
          <li className="list__item">
            <a className="link" href="https://github.com/krzysztof01-sz/squizer-app-frontend">
              Frontend
            </a>
          </li>
          <li className="list__item">
            <a className="link" href="https://github.com/krzysztof01-sz/squizer-app-backend">
              backend
            </a>
          </li>
        </ul>
      </main>
    </Layout>
  );
};

export default About;
