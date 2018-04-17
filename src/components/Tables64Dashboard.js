import React from "react";
import NavBar from "./NavBar";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {getAllGameInfo} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";

import {roomCategories} from '../actions/roomCategories';
import PropTypes from 'prop-types';

import {wsConnect, wsSendCreateGame, wsSendJoinRoomTables, wsSendPlayGame,wsSendWatchGame} from '../actions/WsClientActions';

class Tables64Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }
    handleCreateGame(e) {
        let data = {};//TODO
        this.props.dispatch(wsSendCreateGame(data))
            .then(()=> {
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }


    componentDidMount(){

        if (!window.socketConnection){

            this.props.dispatch(wsConnect())
                .then(()=>{
                    this.props.dispatch(wsSendJoinRoomTables(roomCategories.TABLE_64_ROOM));

                });
                //.catch((e)=>zzzzz);//TODO for this/any fail display frame, or update local state
        }
        else{
            this.props.dispatch(wsSendJoinRoomTables(roomCategories.TABLE_64_ROOM));
        }


    }

    playClicked(gameId){
        this.props.dispatch(wsSendPlayGame(gameId))
            .then(()=> {
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }

    watchClicked(gameId){

        this.props.dispatch(wsSendWatchGame(gameId))
            .then(()=> {
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }
    clearAllGamesCache() {///!!! for development

        this.props.dispatch(removeAllGames())
            .catch((errMsg)=>{
                console.log(errMsg);
            });

    }

    createParticipantPlayerList(gameInfo){
        return (
            <div>
                {gameInfo.players.map(function(player, index){
                    return <li key={index}>{player.id}</li>;
                })}
            </div>
        );
    }

    render() {
        let {gameInfoList} = this.props;

        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1}/>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Play</TableHeaderColumn>
                            <TableHeaderColumn>Watch</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>


                    <TableBody displayRowCheckbox={false}>

                        {gameInfoList.map((gameInfo, index) => (
                            <TableRow key={gameInfo.gameId}>
                                <TableRowColumn >{this.createParticipantPlayerList(gameInfo)}</TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Play" onClick={this.playClicked.bind(this, gameInfo.gameId)} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Watch" onClick={this.watchClicked.bind(this, gameInfo.gameId)} />
                                </TableRowColumn>
                            </TableRow>
                        ))}





                    </TableBody>
                </Table>

                <RaisedButton label="Create game" onClick={this.handleCreateGame.bind(this)} />
                < RaisedButton label="Clear Cache" onClick={this.clearAllGamesCache.bind(this)} />
            </div>
        );
    }
}

Tables64Dashboard.propTypes={
    gameInfoList: PropTypes.array.isRequired
};



function mapStateToProps(state) {
    return {
        gameInfoList:getAllGameInfo(state)
    };
}




export default withRouter(connect(
    mapStateToProps
)(Tables64Dashboard));