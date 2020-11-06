import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm/index';
import SplashScreen from './pages/SplashScreen/index';

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
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, wrapper);
