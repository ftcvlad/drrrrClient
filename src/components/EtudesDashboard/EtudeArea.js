import React from "react";
import styles from '../Css/PlayArea.css';

import PropTypes from 'prop-types';

import Board from '../PlayDashboard/Board';

import RaisedButton from 'material-ui/RaisedButton';

const inlineStyles={
    etudeOverlay:{
        zIndex:1000,
        opacity:0.5,
        position:"absolute",
        top:0, bottom:0,
        width:500,
        height:500,

        display:"flex",
        alignItems:"center",
        justifyContent: "center"
    },
    victoryStyle:{
        backgroundColor:"green",
    },
    loseStyle:{
        backgroundColor:"red",
    }
};


class EtudeArea extends React.Component {

    constructor(props) {
        super(props);


        this.innerMoves = 0;
        this.state = {pickedChecker:[], selectChecker:true, currentMove:0, solved: false, error:false };
    }




    onCellClicked(userId, replaying, gameInfo, gameState, r,c){

            //userId = r, replaying = c because here don't have any objects to bind :)))
            r = userId;
            c = replaying;




            if (this.state.selectChecker){



                this.setState({pickedChecker:[r, c], selectChecker:false});



            }
            else{

                let correctMove = this.props.correctMoves[this.state.currentMove].moveInfo[this.innerMoves];
                let {pickedChecker} = this.state;

                if (correctMove.prev["row"] === pickedChecker[0] &&
                        correctMove.prev["col"] === pickedChecker[1] &&
                        correctMove.next["row"] === r &&
                        correctMove.next["col"] === c){

                    this.innerMoves++;
                    if (this.props.correctMoves[this.state.currentMove].moveInfo.length ===  this.innerMoves){
                        let solved = this.state.currentMove+1 === this.props.correctMoves.length;

                        this.setState({pickedChecker:[],
                            selectChecker:true,
                            solved: solved,
                            currentMove: this.state.currentMove+1});

                        this.innerMoves = 0;
                    }
                    else{
                        this.setState({pickedChecker: [r,c]});
                    }



                }
                else{
                    this.setState({pickedChecker:[], selectChecker:true, currentMove:0, error:true});
                }
            }

    }



    resetEtude(){
        this.innerMoves=0;
        this.setState({pickedChecker:[], selectChecker:true, currentMove:0, solved: false, error:false});
    }


    render(){

        let { correctMoves, boardState} = this.props;






        let withExtraMove = [correctMoves[0]].concat(correctMoves);


        let reverseView = false;



        return (

            <div className={styles.playAreaContainer} >



                <div className={styles.boardContainer}>

                    {this.state.solved &&
                    <div style={Object.assign({}, inlineStyles.victoryStyle, inlineStyles.etudeOverlay)}>
                            <RaisedButton
                                label={"Victory!"}
                                onClick={this.resetEtude.bind(this)}
                                //buttonStyle={inlineStyles.resultsDialogButton}
                            />

                        </div>}


                    {this.state.error &&
                    <div style={Object.assign({}, inlineStyles.loseStyle, inlineStyles.etudeOverlay)}>
                        <RaisedButton
                            label={"You lost!"}
                            onClick={this.resetEtude.bind(this)}
                            //buttonStyle={inlineStyles.resultsDialogButton}
                        />

                    </div>}


                    <Board currentMove={this.state.currentMove}
                           moves={withExtraMove}
                           boardState={boardState}
                           reverseView = {reverseView}
                           pickedChecker={this.state.pickedChecker}
                           showPrevPositions={false}
                           intetrHitBackOffset={this.innerMoves}
                           onCellClicked={this.onCellClicked.bind(this)}
                    />
                </div>












            </div>




        );
    }



}

EtudeArea.propTypes = {
    correctMoves: PropTypes.array.isRequired,
    boardState:PropTypes.array.isRequired
};





export default EtudeArea;

















