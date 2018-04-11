import React from "react";

import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Scrollbars } from 'react-custom-scrollbars';
import AvStop from 'material-ui/svg-icons/av/stop';



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
        height: 440,
        width:170
    },
    listItemsContainer:{
        marginRight:"15px"
    },
    verticalThumb:{
        width:"20px",
        backgroundColor:"#9c1818"
    }
};

class MovesPanel extends React.Component {

    constructor(props) {
        super(props);

    }


    moveRowClicked(i){
        console.log(i);
    }

    render(){

        let {moves, userId} = this.props;
        let listItems = [];
        for (let i=moves.length-1; i>=0; i--){
            let player = moves[i].player;
            let start = moves[i].moveInfo[0].prev;
            let end = moves[i].moveInfo[moves[i].moveInfo.length-1].next;

            let startStr = colLetters[start.col]+rowNumbers[start.row];
            let endStr = colLetters[end.col]+rowNumbers[end.row];

            let moveColor = player === 0 ? "white":"red";
            listItems.push(<ListItem key={"li"+i}
                                     children={<div key={"child"+i} style={styles.moveNumberStyle}>{i+1}</div>}
                                     rightIcon={<AvStop color={moveColor} />}
                                     innerDivStyle={styles.listItemStyle}
                                     primaryText={startStr+"-"+endStr}
                                     onClick={this.moveRowClicked.bind(this, i)}/>);
            listItems.push(<Divider key={"div"+i}/>)
        }

        return  <List style={styles.listStyle}>

            <div style={styles.movesHeader}>Moves</div>
            <Scrollbars style={styles.scrollbarsStyle}
                        renderThumbVertical={props => < div {...props} style={styles.verticalThumb}/>}>


                <div style={styles.listItemsContainer}>
                    {listItems}
                </div>


            </Scrollbars>

        </List>;




    }
}

MovesPanel.propTypes={
    moves: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired
};




export default  MovesPanel;