import React from "react";


import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    getIsGameGoing, getMovingPlayerId, getOwnPlayerObject,
    getOwnStatus
} from "../selectors/gameSelector";
import RaisedButton from 'material-ui/RaisedButton';
import {wsSendConfirmPlaying, wsSendRespondDrawOffer, wsSendCancelDrawOffer, wsSendTimeIsUp, wsSendDropOpponent} from "../actions/WsClientActions";
import Timer from './Timer';
import StatusWaiting from 'material-ui/svg-icons/action/hourglass-full';
import StatusReady from 'material-ui/svg-icons/action/done';
import RatingStar from 'material-ui/svg-icons/toggle/star';

import IconButton from 'material-ui/IconButton';
const wm = require('./images/wm.png');

const playerStatusTexts = ["waiting", "playing", "confirming", "ready", "suggesting draw", "resolving draw offer", "disconnected", "dropping"];
const playerStatuses = {
    waiting: 0,
    playing: 1,
    confirming: 2,
    ready: 3,
    suggestingDraw: 4,
    resolvingDrawOffer: 5,
    disconnected: 6,
    dropper: 7
};



const styles = {
    statusLine: {
        display: "flex",
        height: 35,
        padding: "0 6 0 35",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#4f525a"
    },
    mainContainer: {
        width: 480,//500 - padding
        marginLeft: 206,//width of moves
        padding: 10,
        backgroundColor: "#42454c",
        flexShrink: 0

    },
    statusDescription: {
        display: "flex",
        alignItems:"center"
    },
    buttonContainer:{
        display: "flex",
        width:210,
        justifyContent:"flex-end"
    },
    urgentActionButton: {
        backgroundColor: "#9c1818",
        height: 26,
        lineHeight: 2
    },
    urgentButtonLabel: {
        color: "white",
        fontSize:12
    },
    normalActionButton:{
        height: 26,
        lineHeight: 2,
        border: "1px solid #9c1818"
    },
    normalButtonLabel: {
        color: "#9c1818",
        fontSize:12
    },

    statusTextDiv: {
        marginLeft: 10,
        color: "#d0ab44"
    },

    checkerDiv:{
        width:20,
        height:20,
        borderRadius:14,
        boxShadow: "2px 2px 5px black"
    },
    imgDiv:{
        backgroundColor:"blue",
        flexGrow:0
    },
    otherContentDiv:{
        flexGrow:1,
        backgroundColor: "grey",
        display:"flex",
        flexDirection:"column"
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
        margin: "0 2px 0 2px"
    },
    moveContainer:{
        display:"flex",
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    userContainer:{
        flex:1,
        margin:4,
        fontFamily: "monospace",

        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    usernameText: {
        margin:4,
        textOverflow:"ellipsis",
        overflow:"hidden",
        maxWidth:200
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

    dropOpponent(gameId){

        this.props.dispatch(wsSendDropOpponent(gameId));
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
        let displayDropOpponentButton = false;
        let statusIcon = null;
        let checkerStyle = {};

        if (player !== null){
            let belongsToSelf = player.id === userId;

            displayConfirmButton = belongsToSelf && (playerStatuses.confirming === player.currentStatus);
            displayConfirmDrawButton = belongsToSelf && (playerStatuses.resolvingDrawOffer === player.currentStatus);
            displayDrawSurrenderButtons = belongsToSelf && (playerStatuses.playing === player.currentStatus);
            displayCancelDrawOfferButton = belongsToSelf && (playerStatuses.suggestingDraw === player.currentStatus);
            displayDropOpponentButton = belongsToSelf && (playerStatuses.dropper === player.currentStatus);


            if (movingPlayerId !== null && player.id === movingPlayerId ){
                timerOn = true;
            }

            statusIcon = (player.currentStatus === playerStatuses.playing) || (player.currentStatus === playerStatuses.ready) ? <StatusReady/>: <StatusWaiting/>;
            checkerStyle = Object.assign({},styles.checkerDiv,
                movingPlayerId === player.id ? {border: "3px solid #d0ab44", boxShadow: "0px 0px 16px 4px #d0ab44"}: {},
                player.playsWhite ? {backgroundColor:"white"}:{backgroundColor:"#8c0606"});
        }


        console.log("player AREA");




        return (

            <div style={styles.mainContainer}>



                <div style={{display:"flex"}}>

                    <div style={styles.otherContentDiv}>
                        <div style={styles.statusLine}>
                            <div style={styles.statusDescription}>
                                <IconButton iconStyle={styles.smallIcon}
                                            style={styles.smallButton}>
                                    {statusIcon!==null && statusIcon}
                                </IconButton>
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
                                                  style={{marginRight:10}}
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
                                                  style={{marginRight:10}}
                                                  labelStyle={styles.normalButtonLabel}
                                                  buttonStyle={styles.normalActionButton}
                                                  onClick={this.props.handleDraw}/>
                                    <RaisedButton label="Surrender"
                                                  labelStyle={styles.normalButtonLabel}
                                                  buttonStyle={styles.normalActionButton}
                                                  onClick={this.props.handleSurrender}/>
                                </div>}


                                {displayDropOpponentButton &&
                                <div style={styles.buttonContainer}>
                                    <RaisedButton label="Drop opponent"
                                                  labelStyle={styles.urgentButtonLabel}
                                                  buttonStyle={styles.urgentActionButton}
                                                  onClick={this.dropOpponent.bind(this, gameId)}/>
                                </div>}

                            </div>
                        </div>

                        {player!==null && <div style={{display:"flex", flexGrow:1, alignItems:"center"}}>
                            <div style={styles.userContainer}>
                                <div style={styles.usernameText}>{player!==null && player.username}</div>

                                <div style={{display:"inline-flex"}}>
                                    <IconButton iconStyle={styles.smallIcon}
                                                tooltip={"rating"}
                                                   style={styles.smallButton}>
                                            <RatingStar/>
                                    </IconButton>
                                    <div style={{margin:4}}>{player!==null && player.rating}</div>
                                </div>



                            </div>

                            <div style={styles.moveContainer}>
                                <div style={{width:60, display: "flex", justifyContent:"center"}}>
                                    <div style={checkerStyle}></div>
                                </div>



                                <Timer timerOn={timerOn}
                                       whiteSide={this.state.whiteSide}
                                       handleTimeIsUp={this.handleTimeIsUp.bind(this)} />

                            </div>




                        </div>}
                    </div>
                </div>




            </div>);

//fghfghfghfghfghfghfghfsdfsdfsdfsdf
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



















