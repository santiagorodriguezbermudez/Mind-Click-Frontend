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
import TherapistDetail from '../containers/TherapistDetail';

const App = () => (
  <Router>
    <div className="relative">
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
          <Nav />
          <TherapistList />
          <Footer />
        </Route>
        <Route path="/therapists/:id">
          <Nav />
          <TherapistDetail />
          <Footer />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
