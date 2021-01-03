import React from 'react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Login from './components/login.component';
import Signup from './components/signup.component';
import Home from './components/home.component';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link><br />
                <Link to="/signup">Signup</Link><br />
                <Link to="/home">Home</Link>
            </nav>

            <Switch>
                <Route exact path={["/", "/login"]}>
                    <Login /> 
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
