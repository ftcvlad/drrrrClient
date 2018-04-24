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



const colLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rowNumbers = [8, 7, 6, 5, 4, 3, 2, 1];

const styles = {
    moveNumberStyle:{
        paddingRight: "2px",
        marginRight:"10px",
        borderRight: "1px solid black",//sadasd
        minWidth: "27px"
    },
    listItemStyle:{
        display:"flex",
        color:"white",
        padding: "16px 56px 16px 9px"

    },
    selectedListItemStyle:{
        backgroundColor:"#953136"

    },
    selectedFirstListItemStyle:{
        backgroundColor:"#4d7756"
    },
    listStyle:{
        backgroundColor: "#42454c",
        padding: "0 18px 0 18px",
        height:500
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
        justifyContent: "space-around"
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
            this.timer = setInterval(this.playbackNextClicked.bind(this), 1000);
        }
    }

    stopTimer(){
        if (this.timer !== 0){
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    playbackPrevClicked(){
        const currentMove = Math.max(this.props.currentMove-1, 0);
        this.moveScrollbar(currentMove);
        this.props.currentMoveChanged(currentMove);
    }

    playbackNextClicked(){
        if ((this.props.currentMove+1 ===  this.props.moves.length-1) && (this.state.playing === true)){
            this.setState({playing:false});
            this.stopTimer();
        }
        const currentMove = Math.min(this.props.currentMove+1, this.props.moves.length-1);
        this.moveScrollbar(currentMove);
        this.props.currentMoveChanged(currentMove);
    }

    playbackPlayPauseClicked(){
        let newPlaying = !this.state.playing;
        newPlaying === true ? this.startTimer() : this.stopTimer();
        this.setState({playing: newPlaying});
    }

    moveScrollbar(currentMove){
        const { scrollbars } = this.refs;
        const scrollDistance = (scrollbars.getScrollHeight()-scrollbars.getClientHeight()) * (1-currentMove/(this.props.moves.length-1));
        scrollbars.scrollTop(scrollDistance);
    }

    listItemClicked(currentMove){
        this.moveScrollbar(currentMove);
        this.props.currentMoveChanged(currentMove);
    }


//sdfsdfdsf
    render(){

        let {moves, currentMove} = this.props;
        let listItems = [];
        for (let i=moves.length-1; i>=0; i--){
            let player = moves[i].player;
            let start = moves[i].moveInfo[0].prev;
            let end = moves[i].moveInfo[moves[i].moveInfo.length-1].next;

            let startStr = colLetters[start.col]+rowNumbers[start.row];
            let endStr = colLetters[end.col]+rowNumbers[end.row];

            let moveColor = player === 0 ? "white":"red";
            let listItemStyle = {};
            if (i === currentMove){
                listItemStyle = currentMove === moves.length-1 ? styles.selectedFirstListItemStyle : styles.selectedListItemStyle;
            }


            listItems.push(<ListItem key={"li"+i}
                                     children={<div key={"child"+i} style={styles.moveNumberStyle}>{i+1}</div>}
                                     rightIcon={<AvStop color={moveColor} />}
                                     innerDivStyle={Object.assign(listItemStyle, styles.listItemStyle )}
                                     primaryText={startStr+"-"+endStr}
                                     onClick={()=>this.listItemClicked(i)}/>);
            listItems.push(<Divider key={"div"+i}/>)
        }

        let prevDisabled = currentMove <= 0 || this.state.playing;
        let nextDisabled = currentMove<0 || currentMove === moves.length-1 || this.state.playing;
        let playPauseDisabled = currentMove<0 || currentMove === moves.length-1;//s/dfsdsdfdsf

        let playPauseButton = this.state.playing ? <AvPause /> : <AvPlay /> ;
        return  <List style={styles.listStyle}>

            <div style={styles.movesHeader}>Moves</div>
            <Scrollbars style={styles.scrollbarsStyle}
                        hideTracksWhenNotNeeded={false}
                        ref="scrollbars"
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
    currentMoveChanged: PropTypes.func.isRequired,
    currentMove: PropTypes.number.isRequired

};




export default  MovesPanel;