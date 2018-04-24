import React from "react";
import styles from './Css/PlayArea.css';

import PropTypes from 'prop-types';

import MovesPanel from './MovesPanel';
import Board from './Board';
import {connect} from "react-redux";
import {getCurrentGameInfo, getCurrentGameResult, getCurrentGameState} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";

import {wsSendUserPick, wsSendUserMove} from '../actions/WsClientActions';
import {httpSaveGame} from '../actions/http/profileActions';
import ResultsDialog from "./ResultsDialog";


class PlayArea extends React.Component {

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

    onCellClicked(userId, replaying, gameInfo, gameState, r,c){

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
               this.props.dispatch(wsSendUserPick(moveInfo, gameInfo.gameId));

            }
            else{
                for (let i=0; i<gameState.possibleGoChoices.length;i++){//don't make unneeded requests, but this is ensured on server
                    if (gameState.possibleGoChoices[i].row === moveInfo.r && gameState.possibleGoChoices[i].col === moveInfo.c){
                        this.props.dispatch(wsSendUserMove(moveInfo, gameInfo.gameId));
                        return;
                    }
                }
            }
        }
    }







    saveGame(resId, description){

        let data = {resId: resId,
                    description: description,
                    gameId: this.props.gameInfo.gameId};

        return this.props.dispatch(httpSaveGame(data));
    }


    getPickedChecker(gameInfo, userId, gameState, replaying, reverseView){
        let gridDimension = 8;
        //reverse picked checker for 2nd player
        let pickedChecker = [];
        let isCurrentPlayer = gameInfo.players.length>1 && userId === gameInfo.players[gameState.currentPlayer]["id"];
        if (isCurrentPlayer && gameState.pickedChecker.length === 2 && replaying === false){
            if (reverseView){
                pickedChecker.push(gridDimension-1-gameState.pickedChecker[0]);
                pickedChecker.push(gridDimension-1-gameState.pickedChecker[1]);
            }
            else{
                pickedChecker = gameState.pickedChecker;
            }
        }
        return pickedChecker;
    }

    render(){
        console.log("play area");
        let {gameState, userId, gameInfo, gameResult} = this.props;

        let currentMove = -1;
        if (gameState.moves.length>0){
            currentMove = this.state.replaying === true ? this.state.currentMove : gameState.moves.length-1;
        }

        let showResultsDialog = gameResult.length>0;

        let reverseView = gameInfo.players.length>1 && userId === gameInfo.players[1]["id"];
        let pickedChecker = this.getPickedChecker(gameInfo, userId, gameState, this.state.replaying, reverseView);


        return (

                <div className={styles.playAreaContainer} >
                    {!gameState.isGameGoing && <div className={styles.playAreaOverlay}/>}
                    <MovesPanel moves={gameState.moves}
                                currentMove={currentMove}
                                currentMoveChanged={this.currentMoveChanged.bind(this)}/>


                    <div className={styles.boardContainer}>
                        {this.state.replaying && <div className={styles.replayingOverlay}/>}
                        <Board currentMove={currentMove}
                                    moves={gameState.moves}
                                    boardState={gameState.boardState}
                                    reverseView = {reverseView}
                                    pickedChecker={pickedChecker}
                                    onCellClicked={
                                        this.onCellClicked.bind(this, userId, this.state.replaying, gameInfo, gameState)
                                    }
                                    />
                    </div>





                    {showResultsDialog && <ResultsDialog
                                    saveGame={this.saveGame.bind(this)}
                                    userId={userId}
                                    gameResult={gameResult}/>}


                </div>




        );
    }



}

PlayArea.propTypes = {
    gameState: PropTypes.object.isRequired,
    gameInfo: PropTypes.object.isRequired,
    gameResult:PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired
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
)(PlayArea));

















