import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/authActions';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

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


  
  login(data){
      this.props.authActions.attemptLogin(data)
          .then(()=> this.setState({loginError: ""}))
          .catch(errorMsg=> {
              this.setState({loginError: errorMsg});
          });


  }

  register(data){
      this.props.authActions.attemptRegister(data)
          .then(()=> this.setState({registerError: ""}))
          .catch(errorMsg=> {
              this.setState({registerError: errorMsg});
          });
  }

  render() {
	  
	const {store} = this.context;

    let userLoggedIn = Object.keys(this.props.user).length !== 0;
    return (
      <div className="">
          <NavBar selectedTab={0}/>
          <h1>Checkers main dashboard! to be continued...</h1>
          {!userLoggedIn &&
              <div>
                  <LoginForm onSubmit={this.login.bind(this)} isLogin={true} errorMsg={this.state.loginError}/>
                  < RegisterForm onSubmit={this.register.bind(this)} isLogin={false} errorMsg={this.state.registerError}/>
              </div>
          }
      </div>
    );
  }
}

MainDashboard.propTypes = {
    authActions: PropTypes.object,
    user: PropTypes.object
};

MainDashboard.contextTypes = {
    store: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: getUser(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
      authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDashboard);