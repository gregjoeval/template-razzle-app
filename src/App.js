import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from './pages/not-found';
import Home from './pages/home';
import './App.css';

const App = () => (
    <Switch>
        <Route
            component={Home}
            exact={true}
            path='/'
        />
        <Route component={NotFound} />
    </Switch>
);

export default App;
