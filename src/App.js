import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';

const wrapper = document.querySelector('.app');

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Route exact path="/">
          <SplashScreen />
        </Route>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, wrapper);
