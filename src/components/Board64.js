import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';
const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');
const lastTurnImg = require("./images/lastTurn.png");
import MovesPanel from './MovesPanel';
import {getUser} from "../selectors/userSelector";
import {connect} from "react-redux";
import {getCurrentGameInfo, getCurrentGameResult, getCurrentGameState} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {wsSendUserPick, wsSendUserMove} from '../actions/WsClientActions';

const inlineStyles = {
    resultsDialogContent: {
        width:550,
        backgroundColor:"red"
    },
    resultsDialogActionsContainer:{
        display:"flex",
        justifyContent: "space-around",
        padding:20
    },
    resultsDialogButton:{
        backgroundColor: "white",
        border: "1px solid #9c1818",
        height:30,
        lineHeight: 2
    },
    resultDialogButtonHovered:{
        backgroundColor: "red"
    },
    resultDialogButtonLabel:{
        color: "#9c1818"
    },
    tableColumn:{
        padding:5,
        whiteSpace: "initial",
        width:40,
        borderLeft: "1px solid #d69e9e",
        textAlign:"center"
    },
    tableColumnPlayer:{
        width:100,
        padding:5
    },
    tableColumnNarrow:{
        width:35
    },
    tableBodyRow:{
        borderTop: "1px solid #d69e9e",
        borderBottom: "none"
    },
    playingRedDiv:{
        backgroundColor: "#9c1818",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid #9c1818"
    },
    playingWhiteDiv:{
        backgroundColor: "white",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid black"//gdfgdfg
    },
    dialogTitleStyle:{
        color: "#9c1818"
    }


};

class Board64 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {currentMove: props.gameState.moves.length-1, replaying: false};
    }



    currentMoveChanged(moveNum){
        if (moveNum === this.props.gameState.moves.length-1){
            this.setState({currentMove:moveNum, replaying:false});
        }
        else{
            this.setState({currentMove:moveNum, replaying:true});
        }
    }

    cellClicked(dispatch, r,c, gameState, userId, gameInfo, replaying){

        // if (!animationRunning) {
        //     if (gameGoing){
        //         socket.emit('userMove', {row: r, col: c});
        //     }
        //
        // }


        if (userId === gameInfo.players[gameState.currentPlayer]["id"] && replaying === false){


            console.log("cell clicked");
            let moveInfo = {r,c};
            if (gameState.currentPlayer === 1){ //reverse move info
                let dimendion = gameState.boardState.length;
                moveInfo = {r:dimendion-1-r, c: dimendion-1-c};
            }

            if (gameState.selectChecker){
               dispatch(wsSendUserPick(moveInfo, gameInfo.gameId));

            }
            else{
                for (let i=0; i<gameState.possibleGoChoices.length;i++){//don't make unneeded requests, but this is ensured on server
                    if (gameState.possibleGoChoices[i].row === moveInfo.r && gameState.possibleGoChoices[i].col === moveInfo.c){
                        dispatch(wsSendUserMove(moveInfo, gameInfo.gameId));
                        return;
                    }
                }
            }
        }
    }

    addCheckerImage(checkerType, r, c, pickedChecker, killedPieces){


        let imgClass = '';
        if (pickedChecker.length === 2 && pickedChecker[0] === r && pickedChecker[1] === c){
            imgClass = styles.pickedChecker;
        }

        let killedItem = "";
        if (killedPieces.length>0){
            for (let i=0; i<killedPieces.length; i++){
                if (killedPieces[i].row === r && killedPieces[i].col === c){
                    killedItem = styles.killedItem;
                    checkerType = killedPieces[i].type;//replace 66 with killed type
                    break;
                }
            }
        }


        const classes = `${imgClass} ${killedItem}`;



        if (checkerType === 1){
            return <img src={wm} className={classes} />
        }
        else if (checkerType === 2){
            return <img src={wk} className={classes} />
        }
        else if (checkerType === -1){
            return <img src={bm} className={classes}/>
        }
        else if (checkerType === -2){
            return <img src={bk} className={classes} />
        }

    }

    addLastTurnImages(lastTurns, r, c){

        for (let i=0;i<lastTurns.length; i++){
            if (lastTurns[i].row === r && lastTurns[i].col === c){
                return <img src={lastTurnImg} />
            }
        }

    }


    createBoard(rows, cols, callback, gameState, userId, currentMove, gameInfo, replaying){//TODO recreated after every state update. Improve?


        let gridDimension = gameState.boardState.length;
        //return board to the state after currently selected move.

        let boardStateWithHistory = gameState.boardState.map(arr => arr.slice());

        for (let i=gameState.moves.length-1; i>currentMove; i--){

            const moveInfo = gameState.moves[i].moveInfo;
            for (let j=moveInfo.length-1; j>=0; j--){
                let type = moveInfo[j].prevType;
                boardStateWithHistory[moveInfo[j].next.row][moveInfo[j].next.col] = 0;
                boardStateWithHistory[moveInfo[j].prev.row][moveInfo[j].prev.col] = type;
                if (moveInfo[j].killed){
                    boardStateWithHistory[moveInfo[j].killed.row][moveInfo[j].killed.col] = moveInfo[j].killed.type;
                }
            }
         }

        //reverse board for 2nd player
        let boardState = [];
        if (gameInfo.players.length>1 && userId === gameInfo.players[1]["id"]){
            for(i = 0; i < gridDimension; i++) {
                boardState.push(new Array(gridDimension));
            }
            for (let i =0; i<gridDimension; i++){
                for (let j=0; j<gridDimension; j++){
                    boardState[gridDimension-1-i][gridDimension-1-j] = boardStateWithHistory[i][j];
                }
            }
        }
        else{
            boardState = boardStateWithHistory;
        }

        //reverse picked checker for 2nd player
        let pickedChecker = [];
        if (gameInfo.players.length>1 && userId === gameInfo.players[gameState.currentPlayer]["id"] && replaying === false){
            if (gameInfo.players.length>1 && gameState.pickedChecker.length === 2 && userId === gameInfo.players[1]["id"]){
                pickedChecker.push(gridDimension-1-gameState.pickedChecker[0]);
                pickedChecker.push(gridDimension-1-gameState.pickedChecker[1]);
            }
            else{
                pickedChecker = gameState.pickedChecker;
            }
        }


        // //previous positions
        let prevPositions = [];
        if (gameState.moves.length>0){
            let lastMove = gameState.moves[currentMove];
            prevPositions = lastMove["moveInfo"].map(o => Object.assign({},o.prev));//bug to be remembered † map(o => o.prev);
            if (gameInfo.players.length>1 && userId === gameInfo.players[1]["id"]){//reverse killedPieces for 2nd player
                for (let i=0;i<prevPositions.length;i++){
                    prevPositions[i].row = gridDimension - 1 - prevPositions[i].row;
                    prevPositions[i].col = gridDimension - 1 - prevPositions[i].col;
                }
            }

        }


        //killed pieces
        let killedPieces = [];
        if (gameState.moves.length>0){
            let lastMove = gameState.moves[gameState.moves.length-1];
            if (lastMove.finished === false){
                killedPieces = lastMove["moveInfo"].map(o => o.killed);
                if (gameInfo.players.length>1 && userId === gameInfo.players[1]["id"]){//reverse killedPieces for 2nd player
                    for (let i=0;i<killedPieces.length;i++){
                        killedPieces[i].row = gridDimension - 1 - killedPieces[i].row;
                        killedPieces[i].col = gridDimension - 1 - killedPieces[i].col;
                    }
                }
            }
        }


        let i=0;
        let counter=1;
        let allRows = [];
        let nextRowTds = [];
        for (let r = 0; r < rows; ++r) {

            for (let c = 0; c < cols; ++c) {
                counter++;
                if (counter % 2 !== 0) {
                    nextRowTds.push(<td key={c} id={i} onClick={(function (r, c) {
                        return function () {
                            callback(r, c, gameState, userId, gameInfo, replaying);//dsdsf
                        }
                    })(r, c)}><div>{this.addCheckerImage(boardState[r][c], r, c, pickedChecker, killedPieces)}
                                    {this.addLastTurnImages(prevPositions, r, c)}
                                    </div></td>);
                }
                else{
                    nextRowTds.push(<td key={c}></td>);
                }
                i++;
            }
            counter++;

            allRows.push(<tr key={r} >{nextRowTds}</tr>);
            nextRowTds=[];
        }


        return <tbody>{allRows}</tbody>;
    }


    handleCloseResultsDialog(){
        console.log("ura");
        //this.props.dispatch();//remove results from state
    }


    render(){
        console.log("board64");
        let {gameState, userId, gameInfo, gameResult} = this.props;//asdasd

        let currentMove = -1;
        if (gameState.moves.length>0){
            currentMove = this.state.replaying === true ? this.state.currentMove : gameState.moves.length-1;
        }

       // let showResultsDialog = gameResult.length>0;
        let showResultsDialog = true;
        let narrowColumnStyle = Object.assign({}, inlineStyles.tableColumn, inlineStyles.tableColumnNarrow);

        return (

                <div style={{display:"flex"}}>
                    <MovesPanel moves={gameState.moves}
                                userId={userId}
                                currentMove={currentMove}
                                replaying={this.state.replaying}
                                currentMoveChanged={this.currentMoveChanged.bind(this)}/>
                    <div className={styles.board}>
                        {!gameState.isGameGoing && <div className={styles.boardOverlay}/>}
                        {this.state.replaying && <div className={styles.replayingOverlay}/>}
                        <table >
                            {this.createBoard(8,8,this.cellClicked.bind(this, this.props.dispatch),
                                gameState, userId, currentMove, gameInfo, this.state.replaying)}
                        </table>



                    </div>

                    {showResultsDialog &&
                    <Dialog
                        title="Game results"
                        titleStyle = {inlineStyles.dialogTitleStyle}
                        actions={[

                            <RaisedButton
                                label="Ok"
                                primary={true}
                                labelStyle={inlineStyles.resultDialogButtonLabel}
                                onClick={this.handleCloseResultsDialog.bind(this)}
                                buttonStyle = {inlineStyles.resultsDialogButton}
                            />

                        ]}
                        contentStyle={inlineStyles.resultsDialogContent}
                        actionsContainerStyle = {inlineStyles.resultsDialogActionsContainer}
                        modal={true}
                        open={showResultsDialog}
                    >
                        <Table >
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>

                                    <TableHeaderColumn style={inlineStyles.tableColumnPlayer}>Player</TableHeaderColumn>
                                    <TableHeaderColumn style={inlineStyles.tableColumn}>Side</TableHeaderColumn>
                                    <TableHeaderColumn style={inlineStyles.tableColumn}>Reason</TableHeaderColumn>
                                    <TableHeaderColumn style={inlineStyles.tableColumn}>Rating before</TableHeaderColumn>
                                    <TableHeaderColumn style={inlineStyles.tableColumn}>Rating after</TableHeaderColumn>
                                    <TableHeaderColumn style={narrowColumnStyle}>Wins</TableHeaderColumn>
                                    <TableHeaderColumn style={narrowColumnStyle}>Draws</TableHeaderColumn>
                                    <TableHeaderColumn style={narrowColumnStyle}>Losses</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} >
                                {/*<TableRow>*/}
                                    {/*<TableRowColumn>{gameResult[0].username}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{"white"}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].reason}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].ratingBefore}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].ratingAfter}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].stats.wins}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].stats.draws}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[0].stats.losses}</TableRowColumn>*/}

                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                    {/*<TableRowColumn>{gameResult[1].username}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{"red"}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].reason}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].ratingBefore}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].ratingAfter}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].stats.wins}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].stats.draws}</TableRowColumn>*/}
                                    {/*<TableRowColumn>{gameResult[1].stats.losses}</TableRowColumn>*/}
                                {/*</TableRow>*/}

                                <TableRow style={inlineStyles.tableBodyRow}>
                                    <TableRowColumn  style={inlineStyles.tableColumnPlayer}>{"mozilla@gmail.com"}</TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}><div style={inlineStyles.playingWhiteDiv}></div></TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}>{""}</TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}>{1500}</TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}>{1510}</TableRowColumn>
                                    <TableRowColumn  style={narrowColumnStyle}>{10}</TableRowColumn>
                                    <TableRowColumn  style={narrowColumnStyle}>{17}</TableRowColumn>
                                    <TableRowColumn  style={narrowColumnStyle}>{23}</TableRowColumn>
                                </TableRow>
                                <TableRow style={inlineStyles.tableBodyRow}>
                                    <TableRowColumn  style={ inlineStyles.tableColumnPlayer}>{"vl@gmail.com"}</TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}><div style={inlineStyles.playingRedDiv}></div></TableRowColumn>
                                    <TableRowColumn  style={inlineStyles.tableColumn}>{"left"}</TableRowColumn>
                                    <TableRowColumn style={inlineStyles.tableColumn}>{1500}</TableRowColumn>
                                    <TableRowColumn style={inlineStyles.tableColumn}>{1510}</TableRowColumn>
                                    <TableRowColumn style={narrowColumnStyle}>{10}</TableRowColumn>
                                    <TableRowColumn style={narrowColumnStyle}>{17}</TableRowColumn>
                                    <TableRowColumn style={narrowColumnStyle}>{23}</TableRowColumn>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </Dialog>}

                </div>




        );
    }



}

Board64.propTypes = {
    gameState: PropTypes.object.isRequired,
    gameInfo: PropTypes.object.isRequired,
    gameResult:PropTypes.array.isRequired
};


function mapStateToProps(state) {
    return {
        gameState: getCurrentGameState(state),
        gameInfo: getCurrentGameInfo(state),
        gameResult: getCurrentGameResult(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(Board64));

















