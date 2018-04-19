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
        width: 550,
        position: "absolute",
        zIndex: 110,
        margin:"auto",
        left: 0,
        right: 0,
        top:"20%",
        backgroundColor:"white"
    },
    dialogFooter:{
        padding:17
    },
    dialogHeader: {
        margin: 0,
        padding: "17px 24px 20px",
        color: "#9c1818",
        fontSize: 22,
        textAlign: "left",
        fontWeight: 400
    },
    dialogBody:{
        padding: "0 24px 0 24px"
    },


    resultsDialogButton: {
        backgroundColor: "white",
        border: "1px solid #9c1818",
        height: 30,
        lineHeight: 2
    },
    resultDialogButtonLabel: {
        color: "#9c1818"
    },

    tableColumn: {
        padding: 5,
        whiteSpace: "initial",
        width: 40,
        borderLeft: "1px solid #d69e9e",
        textAlign: "center"
    },
    tableColumnPlayer: {
        width: 100,
        padding: 5
    },
    tableColumnNarrow: {
        width: 35
    },
    tableBodyRow: {
        borderTop: "1px solid #d69e9e",
        borderBottom: "none"
    },
    playingRedDiv: {
        backgroundColor: "#9c1818",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid #9c1818"
    },
    playingWhiteDiv: {
        backgroundColor: "white",
        width: 10,
        height: 10,
        borderRadius: 10,
        margin: "auto",
        border: "1px solid black"//gdfgdfg
    }




};

class ResultsDialog extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        let {gameResult, handleCloseResultsDialog} = this.props;



        let narrowColumnStyle = Object.assign({}, inlineStyles.tableColumn, inlineStyles.tableColumnNarrow);

        return (

            <div style={inlineStyles.resultsDialogContent}>

                <h3 style={inlineStyles.dialogHeader}>Game results</h3>
                <div style={inlineStyles.dialogBody}>
                    <Table>
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
                        <TableBody displayRowCheckbox={false}>

                            <TableRow style={inlineStyles.tableBodyRow}>
                                <TableRowColumn
                                    style={inlineStyles.tableColumnPlayer}>{gameResult[0].username}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>
                                    <div style={inlineStyles.playingWhiteDiv}></div>
                                </TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[0].reason}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[0].ratingBefore}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[0].ratingAfter}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[0].stats.wins}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[0].stats.draws}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[0].stats.losses}</TableRowColumn>
                            </TableRow>
                            <TableRow style={inlineStyles.tableBodyRow}>
                                <TableRowColumn style={inlineStyles.tableColumnPlayer}>{gameResult[1].username}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>
                                    <div style={inlineStyles.playingRedDiv}></div>
                                </TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[1].reason}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[1].ratingBefore}</TableRowColumn>
                                <TableRowColumn style={inlineStyles.tableColumn}>{gameResult[1].ratingAfter}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[1].stats.wins}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[1].stats.draws}</TableRowColumn>
                                <TableRowColumn style={narrowColumnStyle}>{gameResult[1].stats.losses}</TableRowColumn>
                            </TableRow>


                        </TableBody>
                    </Table>
                </div>
                <div style={inlineStyles.dialogFooter}>
                    <RaisedButton
                        label="Save Game"
                        primary={true}
                        labelStyle={inlineStyles.resultDialogButtonLabel}
                        onClick={handleCloseResultsDialog}
                        buttonStyle={inlineStyles.resultsDialogButton}
                    />
                </div>
            </div>


        );
    }


}

ResultsDialog.propTypes = {
    gameResult: PropTypes.array.isRequired,
    handleCloseResultsDialog: PropTypes.func.isRequired
};


export default ResultsDialog;

















