import {connect as reduxConnect} from 'react-redux';
import fetchConnect from 'react-redux-fetch';
import {login, register} from '../actions/authActions';
import PropTypes from 'prop-types';
import React from 'react';
import {getUser} from "../selectors/userSelector";
import NavBar from "./NavBar";
import {RegisterForm, LoginForm} from "./LoginRegisterForm";


class MainDashboard extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            lastAction: "none"
        }
    }


    componentWillMount() {


    }


    login(data) {
        this.setState({lastAction: "login"});
        this.props.dispatchUserPost(data);

    }

    register(data) {
        this.setState({lastAction: "register"});
        this.props.dispatchRegisterUserPost(data);

    }

    render() {
        let {user, userFetch} = this.props;

        // console.log(userFetch);

        let loginError = "";
        let registerError = "";
        if (this.state.lastAction === "login" && userFetch.rejected) {
            loginError = userFetch.reason.cause.msg;
        }
        else if (this.state.lastAction === "register" && userFetch.rejected) {
            registerError = userFetch.reason.cause.msg;
        }

        return (
            <div className="">
                <NavBar selectedTab={0}/>
                <h1>Checkers main dashboard! to be continued...</h1>
                {(user === null) &&
                <div>
                    <LoginForm onSubmit={this.login.bind(this)}
                               label={"Sign in"}
                               errorMsg={loginError}/>
                    <RegisterForm onSubmit={this.register.bind(this)}
                                  label={"Register"}
                                  errorMsg={registerError}/>
                </div>
                }
            </div>
        );
    }
}

MainDashboard.propTypes = {
    dispatchUserPost: PropTypes.func.isRequired,
    userFetch: PropTypes.object,
    user: PropTypes.object,
    dispatchRegisterUserPost: PropTypes.func.isRequired

};


function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}


const MainDashboardWithFetch = fetchConnect([login(), register()])(MainDashboard);

export default reduxConnect(
    mapStateToProps
)(MainDashboardWithFetch);


