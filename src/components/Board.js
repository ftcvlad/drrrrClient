import React from "react";
import PropTypes from 'prop-types';
import styles from './Css/Board.css';

const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');
const lastTurnImg = require("./images/lastTurn.png");


class Board extends React.Component {

    constructor(props) {
        super(props);


    }


    createBoard(rows, cols, onCellClicked, gameState, reverseView, currentMove, pickedChecker){//TODO recreated after every state update. Improve?


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
        if (reverseView){
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

        // //previous positions
        let prevPositions = [];
        if (gameState.moves.length>0){
            let lastMove = gameState.moves[currentMove];
            prevPositions = lastMove["moveInfo"].map(o => Object.assign({},o.prev));//bug to be remembered † map(o => o.prev);
            if (reverseView){//reverse killedPieces for 2nd player
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
                if (reverseView){//reverse killedPieces for 2nd player
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
                            onCellClicked(r, c, gameState);//dsdsf
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


//sdfsdf

    render(){

        let {currentMove, gameState, reverseView, onCellClicked, pickedChecker} = this.props;

        return (
        <div className={styles.board}>

            <table >
                {this.createBoard(8,8,onCellClicked,gameState, reverseView, currentMove, pickedChecker)}
            </table>



        </div>);
    }
}





Board.propTypes = {
    currentMove: PropTypes.number.isRequired,
    onCellClicked: PropTypes.func.isRequired,
    pickedChecker: PropTypes.array.isRequired,
    gameState: PropTypes.object.isRequired,
    reverseView: PropTypes.bool.isRequired


};

export default Board;