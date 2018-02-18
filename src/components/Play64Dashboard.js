import React from "react";
import NavBar from "./NavBar";

import {setupWebSocketConnection, joinRoom} from '../functions/WebSocketStuff';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createGame, removeAllGames} from "../actions/gameActions";
import {getCurrentGame} from '../selectors/gameSelector';
import PropTypes from 'prop-types';



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
        console.log('COMPONENT MOUNT');
        if (!window.socketConnection){
            setupWebSocketConnection('gameRoom',
                this.redirectUnauthorised.bind(this),
                this.redirectNotInGame.bind(this),
                this.props.dispatch);
        }
        else{
            //attach connection to proper group
            joinRoom('gameRoom');
        }


    }
    clearAllGamesCache() {///!!! for development

        this.props.dispatch(removeAllGames())//cfgfcghxdfh dfnhfdgbdfghdf
            .catch((errMsg)=>{
                console.log(errMsg);
            });

    }
    render() {
        console.log(this.props.game);
        let {game} = this.props;

        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={3}/>

                {game!==null && <p>current game present</p>}
                <RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}
Play64Dashboard.propTypes={
    game: PropTypes.object
};


function mapStateToProps(state) {
    return {
        game: getCurrentGame(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(Play64Dashboard));