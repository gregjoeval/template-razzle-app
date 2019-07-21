import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from './screens/not-found';
import Home from './screens/home';

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
