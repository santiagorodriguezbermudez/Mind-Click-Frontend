import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Landing from './Landing';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Nav />
          <Landing />
          <Footer />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
