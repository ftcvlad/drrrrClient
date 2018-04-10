import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';
import {userPick, userMove} from '../functions/WebSocketStuff';//TODO turn websocket stuff into another middleware and actions
const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');
const lastTurn = require("./images/lastTurn.png");

class Board64 extends React.Component {

    constructor(props) {
        super(props);
    }


    cellClicked(r,c, game, userId){


        // if (!animationRunning) {
        //     if (gameGoing){
        //         socket.emit('userMove', {row: r, col: c});
        //     }
        //
        // }

        // public $itemsToDelete = [];
        // public $lastTurns = [];

        if (userId === game.players[game.currentPlayer]){



            let moveInfo = {r,c};
            if (game.currentPlayer === 1){ //reverse move info
                let dimendion = game.boardState.length;
                moveInfo = {r:dimendion-1-r, c: dimendion-1-c};
            }

            if (game.selectChecker){
                userPick(moveInfo, game.gameId);
            }
            else{
                 userMove(moveInfo, game.gameId);
            }
        }
    }

    addCheckerImage(checkerType, r, c, pickedChecker){
        let imgClass = '';
        if (pickedChecker.length === 2 && pickedChecker[0] === r && pickedChecker[1] === c){
            imgClass = styles.pickedChecker;
        }

        if (checkerType === 1){
            return <img src={wm} className={imgClass}/>
        }
        else if (checkerType === 2){
            return <img src={wk} className={imgClass} />
        }
        else if (checkerType === -1){
            return <img src={bm} className={imgClass}/>
        }
        else if (checkerType === -2){
            return <img src={bk} className={imgClass} />
        }

    }

    createBoard(rows, cols, callback, game, userId){//TODO recreated after every state update. Improve?

        let gridDimension = game.boardState.length;


        //reverse board for 2nd player
        let boardState = [];
        if (userId === game.players[1]){
            for(i = 0; i < gridDimension; i++) {
                boardState.push(new Array(gridDimension));
            }
            for (let i =0; i<gridDimension; i++){
                for (let j=0; j<gridDimension; j++){
                    boardState[gridDimension-1-i][gridDimension-1-j] = game.boardState[i][j];
                }
            }
        }
        else{
            boardState = game.boardState;
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

        //reverse last turns for 2nd player
        let lastTurns = [];
        if (userId === game.players[1]){
            console.log(game.lastTurns);
            for (let i=0;i<game.lastTurns.length;i++){
                //game.lastTurns[i]
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
                            callback(r, c, game, userId);//dsdsf
                        }
                    })(r, c)}><div>{
                        this.addCheckerImage(boardState[r][c], r, c, pickedChecker)
                    }</div></td>);
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

        return (

        <div className={styles.board}>
            {!game.isGameGoing && <div className={styles.boardOverlay}></div>}
            <table >
                {this.createBoard(8,8,this.cellClicked, game, userId)}
            </table>

        </div>);
    }



}

Board64.propTypes = {
    game: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired
};

export default Board64;



















