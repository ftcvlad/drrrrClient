import React from "react";


import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getOwnPlayerObject, isUserWatching} from "../selectors/gameSelector";
import RaisedButton from 'material-ui/RaisedButton';

const playerStatusTexts = ["waiting", "playing", "confirming", "ready"];
const playerStatuses = {
    waiting: 0,
    playing: 1,
    confirming: 2,
    ready:3
};

const styles = {
    statusLine:{
        display:"flex",
        height:20,
        alignItems:"center",
        justifyContent: "space-around"
    },
    mainContainer:{
        width: 480,//500 - padding
        marginLeft: 206,//width of moves
        padding:10,
        border: "1px solid black"

    },
    statusDescription:{
        display: "flex"
    },
    confirmPlayButton:{
        backgroundColor: "#9c1818",
        height: 30,
        lineHeight: 2
    },
    confirmPlayButtonLabel:{
        color: "white"
    },
    statusTextDiv:{
        marginLeft: 10
    }

};

class PlayerArea extends React.Component {

    constructor(props) {
        super(props);

    }


    confirmPlaying(gameId){
        console.log("confirmed!");
    }

    render(){

        let {player, forOpponent, gameId, userId} = this.props;
        console.log(player);
        console.log('-----');
        let playerExists = Object.keys(player).length !== 0;
        let belongsToSelf = player.id === userId;

        let displayConfirmButton = belongsToSelf && (playerStatuses.confirming === player.currentStatus);
        return (

            <div style={styles.mainContainer}>

                <div style={styles.statusLine} >
                    <div style={styles.statusDescription}>
                        <div>Status:</div>
                        <div style={styles.statusTextDiv}>{playerExists && playerStatusTexts[player.currentStatus]}</div>
                    </div>
                    <div>
                        {displayConfirmButton &&
                        <RaisedButton label="Confirm"
                                      labelStyle={styles.confirmPlayButtonLabel}
                                      buttonStyle={styles.confirmPlayButton}
                                      onClick={this.confirmPlaying.bind(this, gameId)}/>}
                    </div>





                </div>
            </div>







        );
    }



}

PlayerArea.propTypes = {
    player: PropTypes.object.isRequired,
    forOpponent: PropTypes.bool.isRequired,
    gameId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        player: getOwnPlayerObject(state, ownProps)
    };
}


export default withRouter(connect(
    mapStateToProps
)(PlayerArea));



















