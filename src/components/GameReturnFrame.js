import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {withRouter} from "react-router-dom";
import {getCurrentGameInfo, getMovingPlayerId} from "../selectors/gameSelector";
import {wsSendTimeIsUp} from "../actions/WsClientActions";
import Timer from './Timer';
import StatusWaiting from 'material-ui/svg-icons/action/hourglass-full';
import StatusReady from 'material-ui/svg-icons/action/done';

const playerStatusTexts = ["waiting", "playing", "confirming", "ready", "suggesting draw", "resolving draw offer"];
const playerStatuses = {
    waiting: 0,
    playing: 1,
    confirming: 2,
    ready: 3,
    suggestingDraw: 4,
    resolvingDrawOffer: 5
};

const styles ={
    mainContainer:{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right:0,
        bottom:0,
        width:350,
        height: 131,
        backgroundColor: "wheat",
        zIndex: 100,
        border: "2px solid black",
        padding:10
    }  ,
    frameRow:{
        display:"flex",
        alignItems:"center",
        padding:4
    },
    buttonFrameRow:{
        display:"flex",
        alignItems:"center",
        justifyContent: "center",
        padding: "10 4 4 4 ",
        borderTop: "1px solid black",
        marginTop:10
    },
    frameColumn:{
        width:"50%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"

    },
    checkerDiv:{
        width:20,
        height:20,
        borderRadius:14,
        boxShadow: "2px 2px 5px black"
    },
    button:{
        border: "1px solid #9c1818",
        height: 30,
        lineHeight: 2
    },
    buttonLabel:{
        color: "#9c1818"
    },
    statusIcon:{
        width: 40
    }
};




class GameReturnFrame extends React.Component {

    constructor(props){
        super(props);
    }


    returnToGame(){
        this.props.history.push('/play64');
    }


    handleTimeIsUp(){

        this.props.dispatch(wsSendTimeIsUp(this.props.gameInfo.gameId));
    }


    render(){
        let {gameInfo, movingPlayerId} = this.props;


        let whitePlayerName = "";
        let redPlayerName = "";
        let whitePlayerStatus = "";
        let redPlayerStatus = "";
        let whiteCheckerStyle =  Object.assign({},styles.checkerDiv, {backgroundColor:"white"});
        let redCheckerStyle =  Object.assign({},styles.checkerDiv, {backgroundColor:"#8c0606"});
        let glowBorder = {border: "3px solid #d0ab44", boxShadow: "0px 0px 16px 4px #d0ab44"};
        let whiteTimerOn =  false;
        let redTimerOn = false;
        let redStatusIcon = null;
        let whiteStatusIcon = null;


        let readyIcon = <StatusReady style={styles.statusIcon}/>;
        let waitingIcon = <StatusWaiting style={styles.statusIcon}/>;
        if (gameInfo.players[0] ){
            whitePlayerName = gameInfo.players[0].username;
            whitePlayerStatus = playerStatusTexts[gameInfo.players[0].currentStatus];
            if (gameInfo.players[0].id === movingPlayerId){
                whiteCheckerStyle = Object.assign(whiteCheckerStyle, glowBorder );
            }

            if (movingPlayerId !== null && gameInfo.players[0].id === movingPlayerId ){
                whiteTimerOn = true;
            }

            whiteStatusIcon = (gameInfo.players[0].currentStatus === playerStatuses.playing)
                            || (gameInfo.players[0].currentStatus === playerStatuses.ready) ? readyIcon: waitingIcon ;

        }

        if (gameInfo.players[1] ){
            redPlayerName = gameInfo.players[1].username;
            redPlayerStatus = playerStatusTexts[gameInfo.players[1].currentStatus];
            if (gameInfo.players[1].id === movingPlayerId){
                redCheckerStyle = Object.assign(redCheckerStyle, glowBorder );
            }
            if (movingPlayerId !== null && gameInfo.players[1].id === movingPlayerId ){
                redTimerOn = true;
            }

            redStatusIcon = (gameInfo.players[1].currentStatus === playerStatuses.playing)
                    || (gameInfo.players[1].currentStatus === playerStatuses.ready) ? readyIcon : waitingIcon;
        }









        return (
            <div style={styles.mainContainer}>
                <div style={styles.frameRow}>
                    <div style={styles.frameColumn}><div style={{overflow:"hidden", textOverflow:"ellipsis"}}>{whitePlayerName}</div></div>
                    <div style={styles.frameColumn}><div style={{overflow:"hidden", textOverflow:"ellipsis"}}>{redPlayerName}</div></div>
                </div>
                <div style={styles.frameRow}>
                    <div style={styles.frameColumn}>
                        <div style={{display:"flex", alignItems: "center"}}>
                            {whiteStatusIcon!==null && whiteStatusIcon}
                            {whitePlayerStatus}
                        </div>
                    </div>

                    <div style={{display:"flex", alignItems: "center"}}>
                        {redStatusIcon!==null && redStatusIcon}
                        {redPlayerStatus}
                    </div>


                </div>
                <div style={styles.frameRow}>
                    <div style={styles.frameColumn}>

                        <div style={{width:40, display: "flex", justifyContent:"center"}}>
                            <div style={whiteCheckerStyle}></div>
                        </div>

                        <Timer timerOn={whiteTimerOn}
                               whiteSide={true}
                               handleTimeIsUp={this.handleTimeIsUp.bind(this)} />


                    </div>
                    <div style={styles.frameColumn}>


                        <div style={{width:40, display: "flex", justifyContent:"center"}}>
                            <div style={redCheckerStyle}></div>
                        </div>


                        <Timer timerOn={redTimerOn}
                               whiteSide={false}
                               handleTimeIsUp={this.handleTimeIsUp.bind(this)} />
                    </div>

                </div>
                <div style={styles.buttonFrameRow}>
                    <RaisedButton label="Return to game"
                                  buttonStyle={styles.button}
                                  labelStyle={styles.buttonLabel}
                                  onClick={this.returnToGame.bind(this)}/>
                </div>


            </div>)

    }

}



GameReturnFrame.propTypes = {

    gameInfo: PropTypes.object.isRequired,
    movingPlayerId: PropTypes.number


};


function mapStateToProps(state) {
    return {
        gameInfo: getCurrentGameInfo(state),
        movingPlayerId: getMovingPlayerId(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(GameReturnFrame));