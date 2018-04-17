import React from "react";
import NavBar from "./NavBar";

import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeAllGames} from "../actions/removeActions";
import {getCurrentGameId} from '../selectors/gameSelector';



import {getUser} from '../selectors/userSelector';
import PropTypes from 'prop-types';
import Board64 from './Board64';



import ChatPanel from "./ChatPanel";
import ParticipantList from "./ParticipantPanel";
import {wsConnect, wsSendJoinRoomPlay } from "../actions/WsClientActions";

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
            this.props.dispatch(wsConnect())
                .then(()=>{
                    this.props.dispatch(wsSendJoinRoomPlay());
                });
        }
        else{
            this.props.dispatch(wsSendJoinRoomPlay());
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