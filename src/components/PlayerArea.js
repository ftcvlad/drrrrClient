import React from "react";


import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getCurrentGameState, getMovingPlayerId, getOwnPlayerObject, getOwnStatus} from "../selectors/gameSelector";
import RaisedButton from 'material-ui/RaisedButton';
import {wsSendConfirmPlaying, wsSendRespondDrawOffer, wsSendCancelDrawOffer, wsSendTimeIsUp} from "../actions/WsClientActions";
import Timer from './Timer';

const playerStatusTexts = ["waiting", "playing", "confirming", "ready", "suggesting draw", "resolving draw offer"];
const playerStatuses = {
    waiting: 0,
    playing: 1,
    confirming: 2,
    ready: 3,
    suggestingDraw: 4,
    resolvingDrawOffer: 5
};



const styles = {
    statusLine: {
        display: "flex",
        height: 20,
        alignItems: "center",
        justifyContent: "space-around"
    },
    mainContainer: {
        width: 480,//500 - padding
        marginLeft: 206,//width of moves
        padding: 10,
        border: "1px solid black",
        flexShrink: 0

    },
    statusDescription: {
        display: "flex"
    },
    buttonContainer:{
        display: "flex",
        width:220,
        justifyContent:"space-between"
    },
    urgentActionButton: {
        backgroundColor: "#9c1818",
        height: 30,
        lineHeight: 2
    },
    urgentButtonLabel: {
        color: "white"
    },
    normalActionButton:{
        height: 30,
        lineHeight: 2,
        border: "1px solid #9c1818"
    },
    normalButtonLabel: {
        color: "#9c1818"
    },

    statusTextDiv: {
        marginLeft: 10
    }

};

class PlayerArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {whiteSide: null};
    }


    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps.player !== null){
            if (prevState.whiteSide === nextProps.player.playsWhite){
                return null;
            }

            return {whiteSide: nextProps.player.playsWhite };
        }



        return null;
    }


    confirmPlaying(gameId) {
        this.props.dispatch(wsSendConfirmPlaying(gameId));
    }

    respondDrawOffer(gameId, decision) {
        this.props.dispatch(wsSendRespondDrawOffer(gameId, decision));
    }

    cancelDrawOffer(gameId){


        this.props.dispatch(wsSendCancelDrawOffer(gameId));
    }


    handleTimeIsUp(){

        this.props.dispatch(wsSendTimeIsUp(this.props.gameId));
    }

    render() {

        let {player, movingPlayerId, gameId, userId} = this.props;


        let timerOn = false;
        let displayConfirmButton = false;
        let displayConfirmDrawButton = false;
        let displayDrawSurrenderButtons = false;
        let displayCancelDrawOfferButton = false;

        if (player !== null){
            let belongsToSelf = player.id === userId;

            displayConfirmButton = belongsToSelf && (playerStatuses.confirming === player.currentStatus);
            displayConfirmDrawButton = belongsToSelf && (playerStatuses.resolvingDrawOffer === player.currentStatus);
            displayDrawSurrenderButtons = belongsToSelf && (playerStatuses.playing === player.currentStatus);
            displayCancelDrawOfferButton = belongsToSelf && (playerStatuses.suggestingDraw === player.currentStatus);



            if (movingPlayerId !== null && player.id === movingPlayerId &&
                (playerStatuses.suggestingDraw === player.currentStatus ||
                    playerStatuses.playing === player.currentStatus ||
                    playerStatuses.suggestingDraw === player.currentStatus )){
                timerOn = true;
            }
        }


        console.log("play AREA");


        return (

            <div style={styles.mainContainer}>

                <div style={styles.statusLine}>
                    <div style={styles.statusDescription}>
                        <div>Status:</div>
                        <div
                            style={styles.statusTextDiv}>{player !== null && playerStatusTexts[player.currentStatus]}</div>
                    </div>
                    <div>

                        {displayConfirmButton &&
                        <div style={styles.buttonContainer}>
                            <RaisedButton label="Play"
                                          labelStyle={styles.urgentButtonLabel}
                                          buttonStyle={styles.urgentActionButton}
                                          onClick={this.confirmPlaying.bind(this, gameId)}/>
                        </div>}


                        {displayCancelDrawOfferButton &&
                        <div style={styles.buttonContainer}>
                            <RaisedButton label="Cancel"
                                          labelStyle={styles.urgentButtonLabel}
                                          buttonStyle={styles.urgentActionButton}
                                          onClick={this.cancelDrawOffer.bind(this, gameId)}/>
                        </div>}



                        {displayConfirmDrawButton &&
                        <div style={styles.buttonContainer}>
                            <RaisedButton label="Accept"
                                          labelStyle={styles.urgentButtonLabel}
                                          buttonStyle={styles.urgentActionButton}
                                          onClick={this.respondDrawOffer.bind(this, gameId, true)}/>
                            <RaisedButton label="Decline"
                                          labelStyle={styles.urgentButtonLabel}
                                          buttonStyle={styles.urgentActionButton}
                                          onClick={this.respondDrawOffer.bind(this, gameId, false)}/>
                        </div>}

                        {displayDrawSurrenderButtons &&
                        <div style={styles.buttonContainer}>
                            <RaisedButton label="Draw"
                                          labelStyle={styles.normalButtonLabel}
                                          buttonStyle={styles.normalActionButton}
                                          onClick={this.props.handleDraw}/>
                            <RaisedButton label="Surrender"
                                          labelStyle={styles.normalButtonLabel}
                                          buttonStyle={styles.normalActionButton}
                                          onClick={this.props.handleSurrender}/>
                        </div>}



                    </div>
                </div>

                <br/>
                <Timer timerOn={timerOn} whiteSide={this.state.whiteSide} handleTimeIsUp={this.handleTimeIsUp.bind(this)} />

            </div>);


    }
}

PlayerArea.propTypes = {
    player: PropTypes.object,
    movingPlayerId:  PropTypes.number,



    forOpponent: PropTypes.bool.isRequired,
    gameId: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    handleSurrender: PropTypes.func,
    handleDraw: PropTypes.func


};

function mapStateToProps(state, ownProps) {
    return {
        player: getOwnPlayerObject(state, ownProps),
        movingPlayerId: getMovingPlayerId(state)

    };
}


export default withRouter(connect(
    mapStateToProps
)(PlayerArea));



















