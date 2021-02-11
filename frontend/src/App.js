import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './slices/authUserSlice';

import Home from './components/home.component';
import Login from './components/login.component';
import Profile from './components/profile.component';
import Signup from './components/signup.component';

function App() {
    const isAuth = useSelector(selectIsAuthenticated);

    return (
        <Router>
            <Switch>
                <Route exact path={["/", "/login"]} render={() => isAuth ? <Redirect to="/home"/> : <Login /> } />
                <Route exact path="/signup" render={() => isAuth ? <Redirect to="/home"/> : <Signup /> } />
                <Route exact path="/home" render={() => isAuth ? <Home /> : <Redirect to="/login" /> } />
                <Route exact path="/profile" render={() => isAuth ? <Profile /> : <Redirect to="/login" /> } />
            </Switch>
        </Router>
    );
}

export default App;
