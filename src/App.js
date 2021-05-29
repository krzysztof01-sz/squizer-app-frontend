import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import SplashScreen from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';
import QuizGame from './pages/QuizGame';
import QuizForm from './pages/QuizForm';
import ErrorPage from './pages/ErrorPage';
import AboutQuiz from './pages/AboutQuiz';
import Ranking from './pages/GlobalRanking';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import UserProvider, { UserContext } from './contexts/User';
import { PAGE_NOT_ACCESSIBLE } from './utils/feedbackMessages';
import './styles/App.scss';

const wrapper = document.querySelector('.app');

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <SplashScreen />}
        </Route>
        <Route path="/about">{user ? <About /> : <LoginForm />}</Route>
        <Route path="/signup">{user ? <Redirect to="/dashboard" /> : <SignupForm />}</Route>
        <Route path="/login">{user ? <Redirect to="/dashboard" /> : <LoginForm />}</Route>
        <Route path="/dashboard">{user ? <Dashboard /> : <Redirect to="/login" />}</Route>
        <Route path="/quizform">{user ? <QuizForm /> : <Redirect to="/login" />}</Route>
        <Route path="/quiz/:quizId/play">{user ? <QuizGame /> : <Redirect to="/login" />}</Route>
        <Route path="/quiz/:quizId/about">{user ? <AboutQuiz /> : <Redirect to="/login" />}</Route>
        <Route path="/ranking">{user ? <Ranking /> : <Redirect to="/login" />}</Route>
        <Route path="/profile">{user ? <UserProfile /> : <Redirect to="/login" />}</Route>
        <Route>
          <ErrorPage msg={PAGE_NOT_ACCESSIBLE} />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Switch>
          <App />
        </Switch>
      </Router>
    </UserProvider>
  </React.StrictMode>,
  wrapper,
);
