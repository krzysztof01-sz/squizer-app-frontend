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

        <Heading>sQuizer v2.0 - new features</Heading>
        <ul className="list">
          <ListItem>
            Quizzes rating - now, you can rate visited quizzes, the average rate is visible in the "about quiz" subpage.
          </ListItem>
          <ListItem>
            Quizzes creator - your form data is now kept in the localStorage, so you don't need to worry about disappearing data.
            Added UI improvements
          </ListItem>
          <ListItem>Added better loader, and error handling</ListItem>
          <ListItem>Autologging after successful registration</ListItem>
          <ListItem>Comments updating and deleting</ListItem>
          <ListItem>Added "visited" badge in the quiz card to inform that you've solved some quiz</ListItem>
          <ListItem>Removed login form validation on the client side</ListItem>
          <ListItem>Added different subtle UI corrections</ListItem>
          <ListItem>Authentication and authorization security improvements + fixed bug with authentication.</ListItem>
        </ul>

        <Heading>Why did I create sQuizer?</Heading>
        <p>
          I wanted to learn how to communicate with a backend using React, implement authentication, authorization, security and
          accessibility on my own, so decided to create a small project which later became more complex. Finally, I've learned a
          lot of things even those I didn't meant. Finally, I achieved my basic goal.
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
