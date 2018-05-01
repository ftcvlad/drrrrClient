import React from "react";


import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import  {connect} from "react-redux";
import {logout} from "../actions/authActions";
import {getUser} from "../selectors/userSelector";
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Exit from 'material-ui/svg-icons/action/exit-to-app';


import HoverableLink from "./HoverableLink";
import LetterAvatar from "./LetterAvatar";



const styles = {
    tabsStyle: {
        width: '100%'
    },
    tabStyle: {
        backgroundColor: '#e8e8e8'
    },
    toolGroupStyle:{
        flex:1
    },
    buttonStyle:{
        color:'#ad3f36'
    },
    rightGroupButtonStyle:{
        color:'#ad3f36',
        margin: "0 20 0 20"
    },
    navbarButtonStyle:{

    },
    navbar:{
        display:"flex",
        alignItems:"center",
        backgroundColor: "#42454c",
        justifyContent: "space-around",
        height:60
    },
    navbarProfileGroup:{
        display:"flex",
        alignItems:"center",

    },
    navbarButtonGroup:{
        display:"flex",
        alignItems:"center",
    },
    smallIcon:{
        color: "#d0ab44",
        width:22,
        height:22
    },
    smallButton:{
        padding:0,
        width:22,
        height:22,
        margin: 5
    },


};



class NavBar extends React.Component {

    constructor(props) {
        super(props);

    }



    profileClicked(){
        return this.props.history.push('/profile/'+this.props.user.id);
    }

    logoutClicked(){
        this.props.dispatch(logout())
            .then(() => {
                this.props.history.push('/')
            });
    }



    render() {
        let {user} = this.props;
        let userLoggedIn = Object.keys(user).length !== 0;
        return (


            <div style={styles.navbar}>
                <div style={styles.navbarButtonGroup}>



                    <HoverableLink to="/" label="Home"/>
                    {userLoggedIn &&
                        <HoverableLink to="/tables64" label="Tables"/>
                    }
                    {userLoggedIn &&
                        < HoverableLink to="/etudes" label="Etudes"/>
                    }
                    <HoverableLink to="/rules" label="Rules"/>


                </div>




                {userLoggedIn &&



                    <div style={styles.navbarProfileGroup}>




                        <IconButton iconStyle={styles.smallIcon}
                                    style={styles.smallButton}
                                    tooltip={"Profile"}
                                    tooltipStyles={{top:26}}
                                    onClick={this.profileClicked.bind(this)}>
                            <AccountBox hoverColor={"#9c1818"}/>
                        </IconButton>


                        <IconButton iconStyle={styles.smallIcon}
                                    style={styles.smallButton}
                                    tooltip={"Log out"}
                                    tooltipStyles={{top:26}}
                                    onClick={this.logoutClicked.bind(this)}>
                            <Exit hoverColor={"#9c1818"}/>
                        </IconButton>





                    </div>}

            </div>


        );

    }
}

NavBar.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,

};



function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}




export default withRouter(connect(
    mapStateToProps
)(NavBar));
