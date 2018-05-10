import React from "react";
import styles from '../Css/PlayArea.css';

import PropTypes from 'prop-types';

import MovesPanel from '../PlayDashboard/MovesPanel';
import Board from '../PlayDashboard/Board';


import { wsSendSaveGame} from '../../actions/WsClientActions';



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
                           intetrHitBackOffset={0}
                           showPrevPositions={true}
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

















