import React from "react";
import NavBar from "./NavBar";

import {setupWebSocketConnection, joinRoom} from '../functions/WebSocketStuff';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createGame, removeAllGames} from "../actions/gameActions";
import {getCurrentGame} from '../selectors/gameSelector';
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
            joinRoom(roomCategories.GAME_ROOM);
        }


    }
    clearAllGamesCache() {///!!! for development

        this.props.dispatch(removeAllGames())
            .catch((errMsg)=>{
                console.log(errMsg);
            });

    }
    render() {

        let {game, user} = this.props;

        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={3}/>
                <div style={{display:"flex"}}>
                    {game !== null && <Board64 game={game} userId={user.id}/>  }
                    {game !== null &&
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <ParticipantList players={game.players} watchers={game.watchers}/>
                        <ChatPanel gameId={game.gameId}/>
                    </div>


                    }
                </div>

                {game === null && <p>no game!</p>}
                < RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}
Play64Dashboard.propTypes={
    game: PropTypes.object,
    user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        game: getCurrentGame(state),
        user: getUser(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(Play64Dashboard));