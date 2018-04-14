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
import {getAllGames} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";
import {createGame, playGame, watchGame} from"../actions/gameActions";
import {joinRoom, broadcastGameCreated, broadcastPlayerJoined, roomCategories, setupWebSocketConnection} from "../functions/WebSocketStuff";
import PropTypes from 'prop-types';

class Tables64Dashboard extends React.Component {

    constructor(props) {
        super(props);



    }
    handleCreateGame(e) {
        let data = {};//TODO
        this.props.dispatch(createGame(data))
            .then(()=> {
                broadcastGameCreated();
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }


    redirectUnauthorised(){
        this.props.history.push('/');
    }
    redirectNotInGame(){
        this.props.history.push('/tables64');
    }

    componentDidMount(){

        if (!window.socketConnection){
            setupWebSocketConnection(roomCategories.TABLE_64_ROOM,
                this.redirectUnauthorised.bind(this),
                this.redirectNotInGame.bind(this),
                this.props.dispatch);
        }
        else{
            joinRoom(roomCategories.TABLE_64_ROOM);
        }


    }

    playClicked(gameId){

        let data = {gameId};
        this.props.dispatch(playGame(data))
            .then(()=> {
                broadcastPlayerJoined(gameId);
                this.props.history.push('/play64');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });


    }

    watchClicked(gameId){
        console.log('watch ' +gameId);

        this.props.dispatch(watchGame({gameId}))
            .then(()=> {
                broadcastPlayerJoined(gameId);
                this.props.history.push('/play64');
                console.log('SUCC');
            })
            .catch((errMsg)=>{
                console.log(errMsg);
            });
    }

    createParticipantPlayerList(game){
        return (
            <div>
                {game.players.map(function(player, index){
                    return <li key={index}>{player.id}</li>;
                })}
            </div>
        );
    }

    render() {
        let {games} = this.props;

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

                        {games.map((game, index) => (
                            <TableRow key={game.gameId}>
                                <TableRowColumn >{this.createParticipantPlayerList(game)}</TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Play" onClick={this.playClicked.bind(this, game.gameId)} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton label="Watch" onClick={this.watchClicked.bind(this, game.gameId)} />
                                </TableRowColumn>
                            </TableRow>
                        ))}





                    </TableBody>
                </Table>

                <RaisedButton label="Create game" onClick={this.handleCreateGame.bind(this)} />

            </div>
        );
    }
}

Tables64Dashboard.propTypes={
    games: PropTypes.array.isRequired
};



function mapStateToProps(state) {
    return {
        games:getAllGames(state)
    };
}




export default withRouter(connect(
    mapStateToProps
)(Tables64Dashboard));