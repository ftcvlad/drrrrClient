import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainDashboard from './MainDashboard'
import Play64Dashboard from './Play64Dashboard'
import Tables64Dashboard from './Tables64Dashboard'

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={MainDashboard} />
                <Route path="/tables64" component={Tables64Dashboard} />
                <Route path="/play64" component={Play64Dashboard} />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;