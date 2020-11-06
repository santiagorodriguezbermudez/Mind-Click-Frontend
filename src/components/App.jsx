import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Nav from '../containers/Nav';
import Footer from './Footer';
import Landing from './Landing';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import TherapistList from '../containers/TherapistList';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Nav />
          <Landing />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/therapists">
          <TherapistList />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
