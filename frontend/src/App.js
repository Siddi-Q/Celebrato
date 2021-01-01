import React from 'react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Login from './components/login.component';
import Signup from './components/signup.component';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link><br />
        <Link to="/signup">Signup</Link>
      </nav>

      <Switch>
        <Route exact path="/login">
          <Login /> 
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
