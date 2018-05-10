import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import MainDashboard from './MainDashboard/MainDashboard'
import Play64Dashboard from './PlayDashboard/Play64Dashboard'
import Tables64Dashboard from './TablesDashboard/Tables64Dashboard'
import RulesDashboard from './RulesDashboard/RulesDashboard';
import history from '../history';
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import EtudesDashboard from "./EtudesDashboard/EtudesDashboard";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={MainDashboard} />
                <Route path="/tables64" component={Tables64Dashboard} />
                <Route path="/play64" component={Play64Dashboard} />
                <Route path="/profile/:id"  component={ProfileDashboard}/>
                <Route path="/rules"  component={RulesDashboard}/>
                <Route path="/etudes"  component={EtudesDashboard}/>
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;

//key={ this.context.router.getCurrentPath()}