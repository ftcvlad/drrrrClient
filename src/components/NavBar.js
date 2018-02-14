import React from "react";


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {browserHistory} from 'react-router';
import {Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as userActions from "../actions/authActions";
import {bindActionCreators} from "redux";
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
            value: 3,
        };

    }


    componentWillMount() {

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
                return this.props.history.push('/profile');

        }
    }


    profileClicked(){
        return this.props.history.push('/profile');
    }

    logoutClicked(){
        //this.props.userActions.attemptLogout()
            //.then(() => this.props.history.push('/'));

    }

    render() {

        let userLoggedIn = false;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}  style={styles.toolGroupStyle}>
                    <Tabs initialSelectedIndex={this.props.selectedTab} style={styles.tabsStyle}  onChange={this.handleTabChange.bind(this)}>
                        <Tab value={0} label="Home" style={styles.tabStyle} buttonStyle={styles.buttonStyle}></Tab>
                        <Tab value={1} label="Tables" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>
                        <Tab value={2} label="Etudes" style={styles.tabStyle} buttonStyle={styles.buttonStyle}> </Tab>



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
    user: PropTypes.object
};



function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar));

