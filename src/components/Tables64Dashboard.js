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

import {wsConnect, wsSendJoinRoomTables, wsSendPlayGame, wsSendWatchGame} from '../actions/WsClientActions';
import {removeAllGames} from '../actions/removeActions';

import EmptyPlayerSlot from 'material-ui/svg-icons/social/person-outline';
import FilledPlayerSlot from 'material-ui/svg-icons/social/person';
import EmptyWatchersSlot from 'material-ui/svg-icons/social/people-outline';
import FilledWatchersSlot from 'material-ui/svg-icons/social/people';
import ParticipantList from "./ParticipantPanel";
import CreateGamePanel from "./CreateGamePanel";

const styles = {
    sidePanelContainer:{
        display:"flex",
        flexDirection: "column"
    },
    gameInfoPanel:{
        backgroundColor:"red"
    },
    mainContainer:{
        display:"flex",
        justifyContent: "center",
        padding:30
    },
    tableContainer:{
        flexShrink:0,
        width: 530,
        backgroundColor: "#42454c",
        marginRight:20,
        padding:5
    },
    selectedRow:{
        backgroundColor: "#d0ab44"
    },
    button:{
        border: "1px solid #9c1818",
        height: 30,
        lineHeight: 2
    },
    buttonLabel:{
        color: "#9c1818"
    },
    tableButtonColumn:{
        padding:0
    },
    thColumn:{
        color: "#d0ab44"
    },
    tableColumnNarrow:{
        width:35,
        whiteSpace: "initial",
        paddingRight: 15,

    },
    tableColumn:{

    },
    thRow:{
        backgroundColor: "#4f525a"
    }
};

class Tables64Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {selectedGameInfo: {players:[], watchers:[], gameId: ""}};
    }






    static getDerivedStateFromProps(nextProps, prevState){//state update based on props

        if (prevState.selectedGameInfo.gameId === "" && nextProps.gameInfoList.length>0){
            return {selectedGameInfo:nextProps.gameInfoList[0]};
        }
        return null;

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



    getWatcherDiv(gameInfo){
        if (gameInfo.watchers.length > 0){
            return (<div>
                <FilledWatchersSlot/>
            </div>);
        }
        else{
            return (<div>
                <EmptyWatchersSlot/>
            </div>);
        }
    }

    getPlayerDiv(gameInfo, playerNumber){


        if (!gameInfo.players[playerNumber]){
            return (<div>
                        <EmptyPlayerSlot/>
                    </div>);
        }
        else{
            return (
                <div>
                    <FilledPlayerSlot/>
                    <span>1500</span>
                </div>
            );
        }

    }

    handleRowSelected(selectedRows){
        this.setState({selectedGameInfo: this.props.gameInfoList[selectedRows[0]]});
    }

    render() {
        let {gameInfoList} = this.props;
console.log("table renedr");

        // for (let i=0;i<10;i++){
        //     gameInfoList.push({players:[{id:1},{id:2}], watchers:[],gameId:5});//asdasdds
        // }

        let tableRows = [];

        for (let i=0; i<gameInfoList.length;i++){
            let isSelected =  gameInfoList[i].gameId === this.state.selectedGameInfo.gameId;


            const rowStyle = isSelected ? styles.selectedRow : (i%2 === 0 ? {backgroundColor:"#dedede"} : {});

            tableRows.push(<TableRow style={rowStyle} key={gameInfoList[i].gameId}>
                                <TableRowColumn >{this.getPlayerDiv(gameInfoList[i], 0)}</TableRowColumn>
                                <TableRowColumn >{this.getPlayerDiv(gameInfoList[i], 1)}</TableRowColumn>
                                <TableRowColumn style={styles.tableColumnNarrow}>{this.getWatcherDiv(gameInfoList[i])}</TableRowColumn>
                                <TableRowColumn style={styles.tableColumnNarrow} >15 min</TableRowColumn>
                                <TableRowColumn style={styles.tableButtonColumn}>
                                    {isSelected && <RaisedButton label="Play"
                                                                 buttonStyle={styles.button}
                                                                 labelStyle={styles.buttonLabel}
                                                                 onClick={this.playClicked.bind(this, gameInfoList[i].gameId)} />}
                                </TableRowColumn>
                                <TableRowColumn style={styles.tableButtonColumn}>
                                    {isSelected && <RaisedButton label="Watch"
                                                                 buttonStyle={styles.button}
                                                                 labelStyle={styles.buttonLabel}
                                                                 onClick={this.watchClicked.bind(this, gameInfoList[i].gameId)} />}
                                </TableRowColumn>
                            </TableRow>);
        }

        let gamesExist = tableRows.length > 0;

        let thNarrowStyle = Object.assign({}, styles.thColumn, styles.tableColumnNarrow );

        return (
            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1}/>
                <div style={styles.mainContainer}>
                    <div style={styles.tableContainer}>
                        {gamesExist && <Table onRowSelection={this.handleRowSelected.bind(this)}>
                                        <TableHeader style={styles.thRow} displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={styles.thColumn}>Player 1</TableHeaderColumn>
                                                <TableHeaderColumn style={styles.thColumn}>Player 2</TableHeaderColumn>
                                                <TableHeaderColumn style={thNarrowStyle}>Watchers</TableHeaderColumn>
                                                <TableHeaderColumn style={thNarrowStyle}>Time reserve</TableHeaderColumn>
                                                <TableHeaderColumn></TableHeaderColumn>
                                                <TableHeaderColumn></TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>


                                        <TableBody displayRowCheckbox={false}>
                                            {tableRows}
                                        </TableBody>
                                    </Table>}
                        {!gamesExist && <div>No games...</div>}
                    </div>
                    <div style={styles.sidePanelContainer}>
                        <ParticipantList gameInfo = {this.state.selectedGameInfo}/>


                        <CreateGamePanel/>
                    </div>
                </div>





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