import React from "react";

import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Scrollbars } from 'react-custom-scrollbars';
import AvStop from 'material-ui/svg-icons/av/stop';
import AvStepPrevious from 'material-ui/svg-icons/av/skip-previous';
import AvStepNext from 'material-ui/svg-icons/av/skip-next';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlay from 'material-ui/svg-icons/av/play-arrow';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';


const colLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowNumbers = [8, 7, 6, 5, 4, 3, 2, 1];

const styles = {
    moveNumberStyle:{
        paddingRight: "6px",
        marginRight:"10px",
        borderRight: "1px solid black"
    },
    listItemStyle:{
        display:"flex",
        color:"white"
    },
    selectedListItemStyle:{
        display:"flex",
        color:"white",
        backgroundColor:"#ff0000",
        opacity:0.4
    },
    listStyle:{
        backgroundColor: "#42454c",
        padding: "0 18px 0 18px"

    },
    movesHeader:{
        color: "white",
        fontSize: "23px",
        borderBottom: "3px solid white",
        lineHeight: "48px"
    },
    scrollbarsStyle:{
        height: 399,
        width:170,
        backgroundColor: "#4f525a"
    },
    listItemsContainer:{
        marginRight:"15px"
    },
    verticalThumb:{
        width:"20px",
        backgroundColor:"#9c1818"
    },
    smallIcon:{
        width: 25,
        height: 25,
        color:"#9c1818"
    },
    smallButton:{
        width: 25,
        height: 25,
        padding: 0,
        margin: "0 3px 0 3px"
    },
    playbackHolder:{

        backgroundColor: "#ffffff",
        margin: "10 0 10 0",
        padding: 2,
        display: "flex",
        justifyContent: "space-evenly"
    },
    iconHovered:{
        backgroundColor:"#b7b5b5"

    }
};

class MovesPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {playing: false};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.playbackNextClicked.bind(this), 1300);
        }
    }

    stopTimer(){
        if (this.timer !== 0){
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    playbackPrevClicked(){
        this.props.currentMoveChanged(Math.max(this.props.currentMove-1, 0));
    }

    playbackNextClicked(){
        if ((this.props.currentMove+1 ===  this.props.moves.length-1) && (this.state.playing === true)){
            this.setState({playing:false});
            this.stopTimer();
        }
        this.props.currentMoveChanged(Math.min(this.props.currentMove+1, this.props.moves.length-1));
    }

    playbackPlayPauseClicked(){
        let newPlaying = !this.state.playing;
        newPlaying === true ? this.startTimer() : this.stopTimer();
        this.setState({playing: newPlaying});
    }

//sdfsdfdsf
    render(){

        let {moves, userId, currentMove} = this.props;
        let listItems = [];
        for (let i=moves.length-1; i>=0; i--){
            let player = moves[i].player;
            let start = moves[i].moveInfo[0].prev;
            let end = moves[i].moveInfo[moves[i].moveInfo.length-1].next;

            let startStr = colLetters[start.col]+rowNumbers[start.row];
            let endStr = colLetters[end.col]+rowNumbers[end.row];

            let moveColor = player === 0 ? "white":"red";
            let idStyle = i === currentMove ? styles.selectedListItemStyle : styles.listItemStyle;

            listItems.push(<ListItem key={"li"+i}
                                     children={<div key={"child"+i} style={styles.moveNumberStyle}>{i+1}</div>}
                                     rightIcon={<AvStop color={moveColor} />}
                                     innerDivStyle={idStyle}
                                     primaryText={startStr+"-"+endStr}
                                     onClick={()=>this.props.currentMoveChanged(i)}/>);
            listItems.push(<Divider key={"div"+i}/>)
        }

        let prevDisabled = currentMove === 0 || this.state.playing;
        let nextDisabled = currentMove === moves.length-1 || this.state.playing;
        let playPauseDisabled = currentMove === moves.length-1;

        let playPauseButton = this.state.playing ? <AvPause /> : <AvPlay /> ;
        return  <List style={styles.listStyle}>

            <div style={styles.movesHeader}>Moves</div>
            <Scrollbars style={styles.scrollbarsStyle}
                        renderThumbVertical={props => < div {...props} style={styles.verticalThumb}/>}>


                <div style={styles.listItemsContainer}>
                    {listItems}
                </div>


            </Scrollbars>
            <div style={styles.playbackHolder}>
                <IconButton iconStyle={styles.smallIcon}
                            hoveredStyle={styles.iconHovered}
                            style={styles.smallButton}
                            disabled={prevDisabled}
                            onClick={this.playbackPrevClicked.bind(this)}>

                    <AvStepPrevious />
                </IconButton>

                <IconButton iconStyle={styles.smallIcon}
                            hoveredStyle={styles.iconHovered}
                            style={styles.smallButton}
                            disabled={playPauseDisabled}
                            onClick={this.playbackPlayPauseClicked.bind(this)}>
                    {playPauseButton}
                </IconButton>
                <IconButton iconStyle={styles.smallIcon}
                            hoveredStyle={styles.iconHovered}
                            style={styles.smallButton}
                            disabled={nextDisabled}
                            onClick={this.playbackNextClicked.bind(this)}>
                    <AvStepNext />
                </IconButton>




            </div>

        </List>;




    }
}

MovesPanel.propTypes={
    moves: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
    currentMoveChanged: PropTypes.func.isRequired,
    replaying:PropTypes.bool.isRequired,
    currentMove: PropTypes.number.isRequired

};




export default  MovesPanel;