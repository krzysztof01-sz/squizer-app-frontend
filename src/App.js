import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.scss';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm/index';
import SplashScreen from './pages/SplashScreen/index';
import Dashboard from './pages/Dashboard';
import QuizGame from './pages/Quiz_Game';
import QuizForm from './pages/QuizForm';

const wrapper = document.querySelector('.app');

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Route exact path="/">
          <SplashScreen />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/quiz/:quizId/play">
          <QuizGame />
        </Route>
        <Route path="/quizform">
          <QuizForm />
        </Route>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, wrapper);
