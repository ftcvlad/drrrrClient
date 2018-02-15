import {connect}  from 'react-redux';
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
            loginError:"",
            registerError:""
        }
    }


    componentWillMount() {


    }

    clearState(){
        this.setState({loginError:"", registerError: ""});
    }

    login(data) {

        this.clearState();
        this.props.dispatch(login(data))
            .catch((errMsg)=>{
                this.setState({loginError: errMsg});
            });

    }

    register(data) {
        this.clearState();
        this.props.dispatch(register(data))
            .catch((errMsg)=>{
                this.setState({registerError: errMsg});
            });

    }

    render() {
        let {user} = this.props;


        let userLoggedIn = Object.keys(user).length !== 0;

        return (
            <div className="">
                <NavBar selectedTab={0}/>
                <h1>Checkers main dashboard! to be continued...</h1>
                {!userLoggedIn &&
                <div>
                    <LoginForm onSubmit={this.login.bind(this)}
                               label={"Sign in"}
                               errorMsg={this.state.loginError}/>
                    <RegisterForm onSubmit={this.register.bind(this)}
                                  label={"Register"}
                                  errorMsg={this.state.registerError}/>
                </div>
                }
            </div>
        );
    }
}

MainDashboard.propTypes = {
    user: PropTypes.object
};


function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}


export default connect(
    mapStateToProps
)(MainDashboard);


