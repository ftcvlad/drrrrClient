import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';
import {userPick, userMove} from '../functions/WebSocketStuff';//TODO turn websocket stuff into another middleware and actions
const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');
const lastTurnImg = require("./images/lastTurn.png");
import MovesPanel from './MovesPanel';

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

    cellClicked(r,c, gameState, userId, replaying, gameInfo){


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
                userPick(moveInfo, gameInfo.gameId);
            }
            else{
                for (let i=0; i<gameState.possibleGoChoices.length;i++){//don't make unneeded requests, but this is ensured on server
                    if (gameState.possibleGoChoices[i].row === moveInfo.r && gameState.possibleGoChoices[i].col === moveInfo.c){
                        console.log(moveInfo);
                        userMove(moveInfo, gameInfo.gameId);
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


    createBoard(rows, cols, callback, gameState, userId, currentMove, replaying, gameInfo){//TODO recreated after every state update. Improve?


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
        if (gameInfo.players.length>1 && gameState.pickedChecker.length === 2 && userId === gameInfo.players[1]["id"]){
            pickedChecker.push(gridDimension-1-gameState.pickedChecker[0]);
            pickedChecker.push(gridDimension-1-gameState.pickedChecker[1]);
        }
        else{
            pickedChecker = gameState.pickedChecker;
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
                            callback(r, c, gameState, userId, replaying, gameInfo);//dsdsf
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





    render(){
        console.log("board64");
        let {gameState, userId, gameInfo} = this.props;

        let currentMove = -1;
        if (gameState.moves.length>0){
            currentMove = this.state.replaying === true ? this.state.currentMove : gameState.moves.length-1;
        }


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
                        {this.createBoard(8,8,this.cellClicked, gameState, userId, currentMove, this.state.replaying, gameInfo)}
                    </table>

                </div>
            </div>
        );
    }



}

Board64.propTypes = {
    gameState: PropTypes.object.isRequired,
    gameInfo: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired
};

export default Board64;



















