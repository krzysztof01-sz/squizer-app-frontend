import Layout from '../../global/Components/Layout';
import './index.scss';

const Heading = ({ children }) => {
  return <h2 className="about__heading">{children}</h2>;
};

const ListItem = ({ children }) => {
  return <li className="list__item">{children}</li>;
};

const About = () => {
  return (
    <Layout>
      <main className="wrapper">
        <Heading>About sQuizer</Heading>
        <Heading>Implemented features</Heading>
        <ul className="list">
          <ListItem>Login and registration</ListItem>
          <ListItem>JWT + cookie based security</ListItem>
          <ListItem>Basic Accessibility</ListItem>
          <ListItem>Quizzes creating and deleting</ListItem>
          <ListItem>Scoring and user ranking system</ListItem>
          <ListItem>Comments adding</ListItem>
          <ListItem>Avatar updating</ListItem>
        </ul>

        <Heading>Why did I create sQuizer?</Heading>
        <p>
          In my previous project
          <a className="link" href="https://burza-idzie.web.app">
            <i>(Csale)</i>
          </a>{' '}
          I was working with firebase. It turned out to be a really powerful technology but I was a bit disgusted that I didn't
          know how it works. I mean I knew nothing about authentication, security and working with backend. So in order to learn
          it I decided to create a small project which later became more complex. Finally, I've learned a lot of thing doing this
          project so I achieved my basic goal.
        </p>

        <Heading>Am I planning to add new features?</Heading>
        <p>
          Yes, I'm planning to add better authentication because now I still use partially localStorage for handling user
          authentication on the frontend side (backend has cookie-based auth) or totally change it on cookie + session. Also
          comments deleting and random quiz generation. But I don't guarantee that I'll be done in 100% 😄.
        </p>

        <Heading>If you want to check my github repos:</Heading>
        <ul className="list">
          <ListItem>
            <a className="link" href="https://github.com/krzysztof01-sz/squizer-app-frontend">
              Frontend
            </a>
          </ListItem>
          <ListItem>
            <a className="link" href="https://github.com/krzysztof01-sz/squizer-app-backend">
              Backend
            </a>
          </ListItem>
        </ul>
      </main>
    </Layout>
  );
};

export default About;
