import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import MainDashboard from './MainDashboard'
import Play64Dashboard from './Play64Dashboard'
import Tables64Dashboard from './Tables64Dashboard'

import history from '../history';
import ProfileDashboard from "./ProfileDashboard";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={MainDashboard} />
                <Route path="/tables64" component={Tables64Dashboard} />
                <Route path="/play64" component={Play64Dashboard} />
                <Route path="/profile/:id"  component={ProfileDashboard}/>
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;

//key={ this.context.router.getCurrentPath()}