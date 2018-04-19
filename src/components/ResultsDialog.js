import React from "react";
import styles from './Css/Board64.css';

import PropTypes from 'prop-types';
const wm = require('./images/wm.png');
const bm = require('./images/bm.png');
const wk = require('./images/wk.png');
const bk = require('./images/bk.png');
const lastTurnImg = require("./images/lastTurn.png");
import MovesPanel from './MovesPanel';
import {getUser} from "../selectors/userSelector";
import {connect} from "react-redux";
import {getCurrentGameInfo, getCurrentGameResult, getCurrentGameState} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {wsSendUserPick, wsSendUserMove} from '../actions/WsClientActions';

const inlineStyles = {
    resultsDialogContent: {
        width:550,
        backgroundColor:"red"
    },
    resultsDialogActionsContainer:{
        display:"flex",
        justifyContent: "space-around",
        padding:20
    },
    resultsDialogButton:{
        backgroundColor: "white",
        border: "1px solid #9c1818",
        height:30,
        lineHeight: 2
    },
    resultDialogButtonHovered:{
        backgroundColor: "red"
    },
    resultDialogButtonLabel:{
        color: "#9c1818"
    },
    tableColumn:{
        padding:5,
        whiteSpace: "initial",
        width:40,
        borderLeft: "1px solid #d69e9e",
        textAlign:"center"
    },
    tableColumnPlayer:{
        width:100,
        padding:5
    },
    tableColumnNarrow:{
        width:35
    },
    tableBodyRow:{
        borderTop: "1px solid #d69e9e",
        borderBottom: "none"
    },
    playingRedDiv:{
        backgroundColor: "#9c1818",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid #9c1818"
    },
    playingWhiteDiv:{
        backgroundColor: "white",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid black"//gdfgdfg
    },
    dialogTitleStyle:{
        color: "#9c1818"
    }


};

class ResultsDialog extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){

        let {gameResult, handleCloseResultsDialog} = this.props;



        // let showResultsDialog = gameResult.length>0;

        let narrowColumnStyle = Object.assign({}, inlineStyles.tableColumn, inlineStyles.tableColumnNarrow);

        return (

                <Dialog
                    title="Game results"
                    titleStyle = {inlineStyles.dialogTitleStyle}
                    actions={[
                        <RaisedButton
                            label="Ok"
                            primary={true}
                            labelStyle={inlineStyles.resultDialogButtonLabel}
                            onClick={handleCloseResultsDialog}
                            buttonStyle = {inlineStyles.resultsDialogButton}
                        />

                    ]}
                    contentStyle={inlineStyles.resultsDialogContent}
                    actionsContainerStyle = {inlineStyles.resultsDialogActionsContainer}
                    modal={true}
                    open={true}

                >
                    <Table >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>

                                <TableHeaderColumn style={inlineStyles.tableColumnPlayer}>Player</TableHeaderColumn>
                                <TableHeaderColumn style={inlineStyles.tableColumn}>Side</TableHeaderColumn>
                                <TableHeaderColumn style={inlineStyles.tableColumn}>Reason</TableHeaderColumn>
                                <TableHeaderColumn style={inlineStyles.tableColumn}>Rating before</TableHeaderColumn>
                                <TableHeaderColumn style={inlineStyles.tableColumn}>Rating after</TableHeaderColumn>
                                <TableHeaderColumn style={narrowColumnStyle}>Wins</TableHeaderColumn>
                                <TableHeaderColumn style={narrowColumnStyle}>Draws</TableHeaderColumn>
                                <TableHeaderColumn style={narrowColumnStyle}>Losses</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} >
                            {/*<TableRow>*/}
                            {/*<TableRowColumn>{gameResult[0].username}</TableRowColumn>*/}
                            {/*<TableRowColumn>{"white"}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].reason}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].ratingBefore}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].ratingAfter}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].stats.wins}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].stats.draws}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[0].stats.losses}</TableRowColumn>*/}

                            {/*</TableRow>*/}
                            {/*<TableRow>*/}
                            {/*<TableRowColumn>{gameResult[1].username}</TableRowColumn>*/}
                            {/*<TableRowColumn>{"red"}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].reason}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].ratingBefore}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].ratingAfter}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].stats.wins}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].stats.draws}</TableRowColumn>*/}
                            {/*<TableRowColumn>{gameResult[1].stats.losses}</TableRowColumn>*/}
                            {/*</TableRow>*/}

                            <TableRow style={inlineStyles.tableBodyRow}>
                                <TableRowColumn  style={inlineStyles.tableColumnPlayer}>{"mozilla@gmail.com"}</TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}><div style={inlineStyles.playingWhiteDiv}></div></TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}>{""}</TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}>{1500}</TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}>{1510}</TableRowColumn>
                                <TableRowColumn  style={narrowColumnStyle}>{10}</TableRowColumn>
                                <TableRowColumn  style={narrowColumnStyle}>{17}</TableRowColumn>
                                <TableRowColumn  style={narrowColumnStyle}>{23}</TableRowColumn>
                            </TableRow>
                            <TableRow style={inlineStyles.tableBodyRow}>
                                <TableRowColumn  style={ inlineStyles.tableColumnPlayer}>{"vl@gmail.com"}</TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}><div style={inlineStyles.playingRedDiv}></div></TableRowColumn>
                                <TableRowColumn  style={inlineStyles.tableColumn}>{"left"}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{1500}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{1510}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{10}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{17}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{23}</TableRowColumn>
                            </TableRow>


                        </TableBody>
                    </Table>
                </Dialog>






        );
    }



}

ResultsDialog.propTypes = {
    gameResult:PropTypes.array.isRequired,
    handleCloseResultsDialog: PropTypes.func.isRequired
};




export default ResultsDialog;

















