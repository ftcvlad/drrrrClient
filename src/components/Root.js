import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainDashboard from './MainDashboard'
import Play64Room from './Play64Room'
import Tables64 from './tables64'

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={MainDashboard} />
                <Route path="/tables64" component={Tables64} />
                <Route path="/play64" component={Play64Room} />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;