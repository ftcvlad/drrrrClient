import React from "react";
import NavBar from "./NavBar";

import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeAllGames} from "../actions/removeActions";
import {getCurrentGameId, getCurrentGameInfo} from '../selectors/gameSelector';



import {getUser} from '../selectors/userSelector';
import PropTypes from 'prop-types';
import PlayArea from './PlayArea';



import ChatPanel from "./ChatPanel";
import ParticipantList from "./ParticipantPanel";
import {wsConnect, wsSendJoinRoomPlay, wsSendExitGame, wsSendSurrender, wsSendSuggestDraw,wsSendLeaveRoomTables, wsSendUpdateTimeLeft } from "../actions/WsClientActions";
import Dialog from 'material-ui/Dialog';
import PlayerArea from "./PlayerArea";

const gameActionTypes = {
    surrender: "surrender",
    draw: "draw",
    exit: "exit"
};

const styles = {
    dialogContent: {
        width:320
    },
    dialogActionsContainer:{
        display:"flex",
        justifyContent: "space-around",
        padding:20
    },
    dialogButton:{
        backgroundColor: "#9c1818"
    },
    commonActionPanel:{
        width:250,
        minWidth:250,
        padding:5,
        backgroundColor: "#42454c",
        margin: "0 5px 0 5px",
        display:"flex",
        button:{
            border: "1px solid #9c1818",
            height: 30,
            lineHeight: 2
        },
        buttonRootsStyle:{
            marginTop:30
        },
        buttonLabel:{
            color: "#9c1818"
        }
    }
};
class Play64Dashboard extends React.Component {

    constructor(props) {
        super(props);


        this.state = {confirmDialogOpen:false, selectedGameAction: 0};
    }


    componentDidMount(){

        if (!window.socketConnection){
            this.props.dispatch(wsConnect())
                .then(()=>{
                    this.props.dispatch(wsSendJoinRoomPlay())
                        .catch((error)=>{
                            if (error === 403){
                                this.props.history.push('/tables64');
                            }
                            else if (error === 401){
                                this.props.history.push('/');
                            }
                        });
                });
        }
        else{
            this.props.dispatch(wsSendLeaveRoomTables())
                .catch((error)=>{ if (error===401){ this.props.history.push('/'); }});

            this.props.dispatch(wsSendUpdateTimeLeft())//when entering room should set timer correctly
                .catch((error)=>{
                    if (error === 403){this.props.history.push('/tables64'); }
                    else if (error === 401){this.props.history.push('/');}
                });
        }

    }

    clearAllGamesCache() {///!!! for development

        this.props.dispatch(removeAllGames())
            .catch((errMsg)=>{
                console.log(errMsg);
            });

    }

    showConfirmationDialog(gameActionType){
        this.setState({"confirmDialogOpen":true, "selectedGameAction":gameActionType});
    }

    handleDialogClose(){
        this.setState({"confirmDialogOpen":false,"selectedGameAction":0 });
    }

    handleSubmit(){
        if (this.state.selectedGameAction === gameActionTypes.surrender){
            this.props.dispatch(wsSendSurrender(this.props.gameId));

        }
        else if (this.state.selectedGameAction === gameActionTypes.draw){
            this.props.dispatch(wsSendSuggestDraw(this.props.gameId));

        }
        else if (this.state.selectedGameAction === gameActionTypes.exit){
            this.props.dispatch(wsSendExitGame(this.props.gameId))
                .then(()=>{
                    this.props.history.push('/tables64');
                });
        }
        this.setState({"confirmDialogOpen":false,"selectedGameAction":0 });
    }

    render() {

        let {gameId, user} = this.props;

        let gameLoaded = !!gameId;


        return (
            <div style={{textAlign: 'center'}}>
                <NavBar/>
                {gameLoaded &&
                <div style={{marginTop:50}}>









                    <PlayerArea forOpponent={true}
                                gameId={gameId}
                                userId={user.id}/>
                    <div style={{display: "flex"}}>
                        <PlayArea userId={user.id}/>

                        <div style={{display: "flex", flexDirection: "column"}}>
                            <ParticipantList gameInfo={this.props.gameInfo}/>
                            <ChatPanel gameId={gameId}/>

                        </div>
                    </div>
                    <div style={{display:"flex"}}>

                        <PlayerArea forOpponent={false}
                                    gameId={gameId}
                                    userId={user.id}
                                    handleSurrender={this.showConfirmationDialog.bind(this, gameActionTypes.surrender)}
                                    handleDraw={this.showConfirmationDialog.bind(this, gameActionTypes.draw)}/>
                        <div style={styles.commonActionPanel}>
                            <div style={{backgroundColor:"#4f525a", flexGrow:1}}>
                                <RaisedButton label="Exit"
                                              labelStyle={styles.commonActionPanel.buttonLabel}
                                              buttonStyle={styles.commonActionPanel.button}
                                              style={styles.commonActionPanel.buttonRootsStyle}
                                              onClick={this.showConfirmationDialog.bind(this, gameActionTypes.exit)}/>
                            </div>

                        </div>

                    </div>





                </div>
                }
                <Dialog
                    title="Confirm"
                    actions={[
                        <RaisedButton
                            label="Cancel"
                            primary={true}
                            onClick={this.handleDialogClose.bind(this)}
                            buttonStyle = {styles.dialogButton}
                        />,
                        <RaisedButton
                            label="Ok"
                            primary={true}
                            onClick={this.handleSubmit.bind(this)}
                            buttonStyle = {styles.dialogButton}
                        />,
                    ]}
                    contentStyle={styles.dialogContent}
                    actionsContainerStyle = {styles.dialogActionsContainer}
                    modal={true}
                    open={this.state.confirmDialogOpen}
                >
                    Are you sure you want to {this.state.selectedGameAction} ?
                </Dialog>




                {!gameLoaded && <p>no game!</p>}
                < RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}
Play64Dashboard.propTypes={
    gameId: PropTypes.string,
    user: PropTypes.object.isRequired,
    gameInfo: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        gameId: getCurrentGameId(state),
        user: getUser(state),
        gameInfo: getCurrentGameInfo(state)//TODO now with any gameInfo change (ie status) redraw all panels
    };
}


export default withRouter(connect(
    mapStateToProps
)(Play64Dashboard));