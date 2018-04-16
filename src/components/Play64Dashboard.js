import React from "react";
import NavBar from "./NavBar";

import {setupWebSocketConnection, joinRoomPlay} from '../functions/WebSocketStuff';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeAllGames} from "../actions/gameActions";
import {getCurrentGameInfo, getCurrentGameState, getCurrentGameChatMessages} from '../selectors/gameSelector';



import {getUser} from '../selectors/userSelector';
import PropTypes from 'prop-types';
import Board64 from './Board64';


import {roomCategories} from "../functions/WebSocketStuff";
import ChatPanel from "./ChatPanel";
import ParticipantList from "./ParticipantPanel";

class Play64Dashboard extends React.Component {

    constructor(props) {
        super(props);






    }

    redirectUnauthorised(){
        this.props.history.push('/');
    }

    redirectNotInGame(){
        this.props.history.push('/tables64');
    }

    componentDidMount(){

        if (!window.socketConnection){
            setupWebSocketConnection(roomCategories.GAME_ROOM,
                this.redirectUnauthorised.bind(this),
                this.redirectNotInGame.bind(this),
                this.props.dispatch);
        }
        else{
            joinRoomPlay();
        }


    }
    clearAllGamesCache() {///!!! for development

        this.props.dispatch(removeAllGames())
            .catch((errMsg)=>{
                console.log(errMsg);
            });

    }
    render() {

        let {gameInfo, gameState, chatMessages, user} = this.props;
        let gameId = gameInfo.gameId;

        let gameLoaded = gameId ? true : false;
        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={3}/>
                <div style={{display:"flex"}}>
                    {gameLoaded && <Board64 gameState={gameState} gameInfo={gameInfo} userId={user.id}/>  }
                    {gameLoaded &&
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <ParticipantList players={gameInfo.players} watchers={gameInfo.watchers}/>
                        <ChatPanel gameId={gameId} chatMessages={chatMessages}/>
                    </div>


                    }
                </div>

                {!gameLoaded && <p>no game!</p>}
                < RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}
Play64Dashboard.propTypes={
    gameInfo: PropTypes.object.isRequired,
    gameState: PropTypes.object.isRequired,
    chatMessages: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        gameInfo: getCurrentGameInfo(state),
        gameState: getCurrentGameState(state),
        chatMessages: getCurrentGameChatMessages(state),
        user: getUser(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(Play64Dashboard));