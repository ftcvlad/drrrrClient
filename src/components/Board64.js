import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';

const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');

class Board64 extends React.Component {

    constructor(props) {
        super(props);
    }


    cellClicked(r,c){
        console.log(r+ " "+ c);

        // if (!animationRunning) {
        //     if (gameGoing){
        //         socket.emit('userMove', {row: r, col: c});
        //     }
        //
        // }
    }

    addCheckerImage(checkerType){
        if (checkerType === 1){
            return <img src={wm} />
        }
        else if (checkerType === 2){
            return <img src={wk} />
        }
        else if (checkerType === -1){
            return <img src={bm} />
        }
        else if (checkerType === -2){
            return <img src={bk} />
        }

    }

    createBoard(rows, cols, callback, game){
        let i=0;
        let counter=1;
        let allRows = [];
        let nextRowTds = [];
        for (let r = 0; r < rows; ++r) {

            for (let c = 0; c < cols; ++c) {
                counter++;
                if (counter % 2 !== 0) {
                    nextRowTds.push(<td key={c}><div id={i} onClick={(function (r, c) {
                        return function () {
                            callback(r, c);
                        }
                    })(r, c)}>{this.addCheckerImage(game.boardState[r][c])}</div></td>);
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

        let {game} = this.props;

        return (

        <div className={styles.board}>
            {!game.isGameGoing && <div className={styles.boardOverlay}></div>}
            <table >
                {this.createBoard(8,8,this.cellClicked, game)}
            </table>

        </div>);
    }



}

Board64.propTypes = {
    game: PropTypes.object.isRequired
};

export default Board64;



















