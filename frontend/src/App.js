import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './components/login.component';
import Signup from './components/signup.component';
import Home from './components/home.component';
import { useSelector } from 'react-redux';

function App() {
    const isAuth = useSelector(state => state.authUser.isAuthenticated);

    return (
        <Router>
            <Switch>
                <Route exact path={["/", "/login"]} render={() => isAuth ? <Redirect to="/home"/> : <Login /> } />
                <Route exact path="/signup" render={() => isAuth ? <Redirect to="/home"/> : <Signup /> } />
                <Route exact path="/home" render={() => isAuth ? <Home /> : <Redirect to="/login" /> } />
            </Switch>
        </Router>
    );
}

export default App;
