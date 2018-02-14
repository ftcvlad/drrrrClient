import {connect as reduxConnect} from 'react-redux';
import fetchConnect from 'react-redux-fetch';
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/authActions';
import PropTypes from 'prop-types';
import React from 'react';
import {Link, withRouter} from 'react-router-dom';

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

      this.props.dispatchUserPost(data);

      // this.props.authActions.attemptLogin(data)
      //     .then(()=> this.setState({loginError: ""}))
      //     .catch(errorMsg=> {
      //         this.setState({loginError: errorMsg});
      //     });


  }

  register(data){
      this.props.authActions.attemptRegister(data)
          .then(()=> this.setState({registerError: ""}))
          .catch(errorMsg=> {
              this.setState({registerError: errorMsg});
          });
  }

  render() {
	  




     //console.log(this.props.dispatchUserPost);
      console.log('--9');
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
    dispatchUserPost: PropTypes.func.isRequired,
    userFetch: PropTypes.object,
    user: PropTypes.object
};


function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}



const MainDashboardWithFetch = fetchConnect([{
    resource: 'user',
    method: 'post', // You can omit this, this is the default
    request: (data)=>({
        url: 'http://localhost:8080/login',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
        mode: 'cors',
        credentials: 'include'
    })
}])(MainDashboard);

export default reduxConnect(
    mapStateToProps
)(MainDashboardWithFetch);


