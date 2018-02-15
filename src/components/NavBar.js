import React from "react";


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {browserHistory} from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect as reduxConnect, connect} from "react-redux";
import {logout} from "../actions/authActions";
import {getUser} from "../selectors/userSelector";
import AccountBox from 'material-ui/svg-icons/action/account-box';
import fetchConnect from "react-redux-fetch";


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
            logoutDispatched:false
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
        this.props.dispatchUserDelete();

        this.setState({logoutDispatched: true});

    }

    componentDidUpdate(){
        let {userFetch} = this.props;
        if (this.state.logoutDispatched && !userFetch.pending){
            this.setState({logoutDispatched: false});
            if (userFetch.fulfilled){
                this.props.history.push('/');
            }
        }

    }

    render() {
        let {user, userFetch} = this.props;

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

                {user !== null &&
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

    dispatchUserDelete: PropTypes.func.isRequired,
    userFetch: PropTypes.object
};



function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}



const NavBarWithFetch = fetchConnect([logout()])(NavBar);

export default withRouter(reduxConnect(
    mapStateToProps
)(NavBarWithFetch));
