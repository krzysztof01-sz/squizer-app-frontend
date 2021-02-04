import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import SplashScreen from './pages/SplashScreen';
import Dashboard from './pages/Dashboard';
import QuizGame from './pages/QuizGame';
import QuizForm from './pages/QuizForm';
import AuthProvider, { AuthContext } from './contexts/Auth';
import ErrorPage from './pages/ErrorPage';
import AboutQuiz from './pages/AboutQuiz';
import * as fb from './utils/feedbackMessages';
import './styles/App.scss';

const wrapper = document.querySelector('.app');

const App = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/">
            {isLogged ? <Redirect to="/dashboard" /> : <SplashScreen />}
          </Route>
          <Route path="/signup">{isLogged ? <Redirect to="/dashboard" /> : <SignupForm />}</Route>
          <Route path="/login">{isLogged ? <Redirect to="/dashboard" /> : <LoginForm />}</Route>
          <Route path="/dashboard">{isLogged ? <Dashboard /> : <Redirect to="/login" />}</Route>
          <Route path="/quizform">{isLogged ? <QuizForm /> : <Redirect to="/login" />}</Route>
          <Route path="/quiz/:quizId/play">{isLogged ? <QuizGame /> : <Redirect to="/login" />}</Route>
          <Route path="/quiz/:quizId/about">{isLogged ? <AboutQuiz /> : <Redirect to="/login" />} </Route>
          <Route>
            <ErrorPage msg={fb.PAGE_DOESNT_EXISTS} />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  wrapper,
);
