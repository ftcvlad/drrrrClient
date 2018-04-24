import React from "react";
import NavBar from "./NavBar";

import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";

import PropTypes from 'prop-types';
import SavedGamesTable from './SavedGamesTable';

class ProfileDashboard extends React.Component {

    constructor(props) {
        super(props);

    }

    render(){




        return (

            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1} />

                <div>
                    <SavedGamesTable/>
                </div>



            </div>
        );
    }
}
ProfileDashboard.propTypes={

};




export default ProfileDashboard;