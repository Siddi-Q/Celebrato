import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './slices/authUserSlice';

import Login from './components/login.component';
import Signup from './components/signup.component';
import Home from './components/home.component';

function App() {
    const isAuth = useSelector(selectIsAuthenticated);

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
