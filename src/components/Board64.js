import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';

class Board64 extends React.Component {

    constructor(props) {
        super(props);
    }


    cellClicked(r,c){
        console.log(r+ " "+ c);//dgfdfgfdgfdgfgnnfgjgdsjbk

        // if (!animationRunning) {
        //     if (gameGoing){
        //         socket.emit('userMove', {row: r, col: c});
        //     }
        //
        // }
    }


    createBoard(rows, cols, callback){
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
                    })(r, c)}>yo</div></td>);
                }
                else{
                    nextRowTds.push(<td key={c}><div>{i}</div></td>);
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

        return (

        <div className={styles.board}>
            <table >
                {this.createBoard(8,8,this.cellClicked)}
            </table>

        </div>);
    }



}

Board64.propTypes = {
    game: PropTypes.object
};

export default Board64;



















