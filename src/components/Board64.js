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

        this.state = {currentMove: props.game.moves.length-1, replaying: false};
    }

    moveRowClicked(moveNum){
        if (moveNum === this.props.game.moves.length-1){
            this.setState({currentMove:moveNum, replaying:false});
        }
        else{
            this.setState({currentMove:moveNum, replaying:true});
        }
    }

    cellClicked(r,c, game, userId, replaying){


        // if (!animationRunning) {
        //     if (gameGoing){
        //         socket.emit('userMove', {row: r, col: c});
        //     }
        //
        // }


        if (userId === game.players[game.currentPlayer] && replaying === false){


            console.log("cell clicked");
            let moveInfo = {r,c};
            if (game.currentPlayer === 1){ //reverse move info
                let dimendion = game.boardState.length;
                moveInfo = {r:dimendion-1-r, c: dimendion-1-c};
            }

            if (game.selectChecker){
                userPick(moveInfo, game.gameId);
            }
            else{
                for (let i=0; i<game.possibleGoChoices.length;i++){//don't make unneeded requests, but this is ensured on server
                    if (game.possibleGoChoices[i].row === moveInfo.r && game.possibleGoChoices[i].col === moveInfo.c){
                        userMove(moveInfo, game.gameId);
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


    createBoard(rows, cols, callback, game, userId, currentMove, replaying){//TODO recreated after every state update. Improve?

        let gridDimension = game.boardState.length;

        //return board to the state after currently selected move.
        let boardStateWithHistory = game.boardState.map(arr => arr.slice());

        for (let i=game.moves.length-1; i>currentMove; i--){
            const moveInfo = game.moves[i].moveInfo;
            for (let j=moveInfo.length-1; j>=0; j--){
                let type = boardStateWithHistory[moveInfo[j].next.row][moveInfo[j].next.col];
                boardStateWithHistory[moveInfo[j].next.row][moveInfo[j].next.col] = 0;
                boardStateWithHistory[moveInfo[j].prev.row][moveInfo[j].prev.col] = type;
                if (moveInfo[j].killed){
                    boardStateWithHistory[moveInfo[j].killed.row][moveInfo[j].killed.col] = moveInfo[j].killed.type;
                }
            }
        }







        //reverse board for 2nd player
        let boardState = [];
        if (userId === game.players[1]){
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
        if (game.pickedChecker.length === 2 && userId === game.players[1]){
            pickedChecker.push(gridDimension-1-game.pickedChecker[0]);
            pickedChecker.push(gridDimension-1-game.pickedChecker[1]);
        }
        else{
            pickedChecker = game.pickedChecker;
        }

        //previous positions
        let prevPositions = [];
        if (game.moves.length>0){
            let lastMove = game.moves[currentMove];
            prevPositions = lastMove["moveInfo"].map(o => o.prev);
            if (userId === game.players[1]){//reverse killedPieces for 2nd player
                for (let i=0;i<prevPositions.length;i++){
                    prevPositions[i].row = gridDimension - 1 - prevPositions[i].row;
                    prevPositions[i].col = gridDimension - 1 - prevPositions[i].col;
                }
            }

        }


        //killed pieces
        let killedPieces = [];
        if (game.moves.length>0){
            let lastMove = game.moves[game.moves.length-1];
            if (lastMove.finished === false){
                killedPieces = lastMove["moveInfo"].map(o => o.killed);
                if (userId === game.players[1]){//reverse killedPieces for 2nd player
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
                            callback(r, c, game, userId, replaying);//dsdsf
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

        let {game, userId} = this.props;

        let currentMove = this.state.replaying === true ? this.state.currentMove : game.moves.length-1;

        return (
            <div style={{display:"flex"}}>
                <MovesPanel moves={game.moves}
                            userId={userId}
                            currentMove={currentMove}
                            replaying={this.state.replaying}
                            moveRowClicked={this.moveRowClicked.bind(this)}/>
                <div className={styles.board}>
                    {!game.isGameGoing && <div className={styles.boardOverlay}></div>}
                    {this.state.replaying && <div className={styles.replayingOverlay}></div>}
                    <table >
                        {this.createBoard(8,8,this.cellClicked, game, userId, currentMove, this.state.replaying)}
                    </table>

                </div>
            </div>
        );
    }



}

Board64.propTypes = {
    game: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired
};

export default Board64;



















