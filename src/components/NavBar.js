import React from "react";


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {browserHistory} from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import  {connect} from "react-redux";
import {logout} from "../actions/authActions";
import {getUser} from "../selectors/userSelector";
import AccountBox from 'material-ui/svg-icons/action/account-box';



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
    }
};



class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3
        };

    }

    handleTabChange(value) {

        switch (value) {
            case 0:
                return this.props.history.push('/');
            case 1:
                return this.props.history.push('/tables64');
            case 2:
                return this.props.history.push('/etudes');
            case 3:
                return this.props.history.push('/rules');


        }
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
            <Toolbar>
                <ToolbarGroup firstChild={true}  style={styles.toolGroupStyle}>
                    <Tabs initialSelectedIndex={this.props.selectedTab} style={styles.tabsStyle}  onChange={this.handleTabChange.bind(this)}>
                        <Tab value={0} label="Home" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>
                        <Tab value={1} label="Tables" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>
                        <Tab value={2} label="Etudes" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>
                        <Tab value={3} label="Rules" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>




                    </Tabs>
                    <ToolbarSeparator />
                </ToolbarGroup>

                {userLoggedIn &&
                    <ToolbarGroup>
                        <IconMenu
                            iconButtonElement={<IconButton><AccountBox /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}

                        >
                            <MenuItem onClick={this.profileClicked.bind(this)} primaryText="Profile" />
                            <MenuItem onClick={this.logoutClicked.bind(this)} primaryText="Log out" />
                        </IconMenu>
                    </ToolbarGroup>
                }
            </Toolbar>
        );

    }
}

NavBar.propTypes = {
    history: PropTypes.object,
    selectedTab: PropTypes.number.isRequired,
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
