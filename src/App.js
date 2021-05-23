import React, { useContext, useEffect, useState } from 'react';
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
import * as api from './api';
import './styles/App.scss';

const wrapper = document.querySelector('.app');

const App = () => {
  const { user, setUser } = useContext(UserContext);

  // when user refresh the page manually, run refetchUser function
  useEffect(() => {
    if (!user) {
      const refetchUser = async () => {
        const result = await api.refetchUser();
        setUser(result.user);
      };
      refetchUser();
    }

    return () => false;
  }, [user]);

  return (
    <Router>
      {user ? (
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/signup">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/login">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/quizform" component={QuizForm} />
          <Route path="/quiz/:quizId/play" component={QuizGame} />
          <Route path="/quiz/:quizId/about" component={AboutQuiz} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/profile" component={UserProfile} />
          <Route>
            <ErrorPage msg={'Page not accessible'} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={SplashScreen} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Route>
            <ErrorPage msg={'Page not accessible'} />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  wrapper,
);
