import React from "react";
import NavBar from "./NavBar";

import {setupWebSocketConnection, joinRoomPlay} from '../functions/WebSocketStuff';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeAllGames} from "../actions/gameActions";
import {getCurrentGameId} from '../selectors/gameSelector';



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

        let {gameId, user} = this.props;

        let gameLoaded = gameId ? true : false;
        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={3}/>
                {gameLoaded && <div style={{display:"flex"}}>
                                    <Board64 userId={user.id}/>

                                    <div style={{display:"flex", flexDirection:"column"}}>
                                        <ParticipantList/>
                                        <ChatPanel gameId={gameId} />
                                    </div>
                                </div>}



                {!gameLoaded && <p>no game!</p>}
                < RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}
Play64Dashboard.propTypes={
    gameId: PropTypes.string,
    user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        gameId: getCurrentGameId(state),
        user: getUser(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(Play64Dashboard));