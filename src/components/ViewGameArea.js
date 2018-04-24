import React from "react";
import styles from './Css/PlayArea.css';

import PropTypes from 'prop-types';

import MovesPanel from './MovesPanel';
import Board from './Board';
import {connect} from "react-redux";
import {getCurrentGameInfo, getCurrentGameResult, getCurrentGameState} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";

import {wsSendUserPick, wsSendUserMove, wsSendSaveGame} from '../actions/WsClientActions';
import ResultsDialog from "./ResultsDialog";


class ViewGameArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {currentMove: props.moves.length-1};
    }



    currentMoveChanged(moveNum){
        if (moveNum === this.props.moves.length-1){
            this.setState({currentMove:moveNum});
        }
        else{
            this.setState({currentMove:moveNum});
        }
    }

    onCellClicked(){
        console.log("hello :)");
    }




    render(){

        let { moves, boardState, playsWhite} = this.props;

        let currentMove = -1;
        if (moves.length>0){
            currentMove = this.state.currentMove;
        }



        let reverseView = !playsWhite;
        let pickedChecker = [];


        return (

            <div className={styles.playAreaContainer} >
                <MovesPanel moves={moves}
                            currentMove={currentMove}
                            currentMoveChanged={this.currentMoveChanged.bind(this)}/>


                <div className={styles.boardContainer}>
                    <Board currentMove={currentMove}
                           moves={moves}
                           boardState={boardState}
                           reverseView = {reverseView}
                           pickedChecker={pickedChecker}
                           onCellClicked={this.onCellClicked}
                    />
                </div>








            </div>




        );
    }



}

ViewGameArea.propTypes = {
    playsWhite: PropTypes.bool.isRequired,
    moves: PropTypes.array.isRequired,
    boardState:PropTypes.array.isRequired,
};





export default ViewGameArea;

















