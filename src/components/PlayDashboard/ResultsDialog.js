import React from "react";
import styles from '../Css/PlayArea.css';

import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { BeatLoader} from 'react-spinners';

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
        padding:17,
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end"
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
    },
    tfUnderlineStyle: {
        borderColor: "#9c1818",
        bottom:10
    },
    tfUnderlineFocusStyle:{
        display: "none"
    },
    spinnerDiv:{
        width:100

    }




};

class ResultsDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {gameDescription: "", errorText: "", gameSaved: false, saving: false};
    }


    handleSaveGame(resId){

        this.setState({errorText:"", saving: true});
        this.props.saveGame(resId, this.state.gameDescription)
            .then(()=>{
                this.setState({gameSaved: true, saving: false});
            })
            .catch((e)=>{
                this.setState({errorText: "error!", saving: false});
            })
    }


    render() {

        let {gameResult, userId} = this.props;

        let resId = gameResult[0].resId ;


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


                        <div style={inlineStyles.spinnerDiv}>
                            <BeatLoader
                                color={'#9c1818'}
                                size={10}
                                loading={this.state.saving}/>
                        </div >

                        {!this.state.saving && <RaisedButton
                            disabled={this.state.gameSaved}
                            label={this.state.gameSaved ? "Saved" : "Save Game"}
                            primary={true}
                            labelStyle={inlineStyles.resultDialogButtonLabel}
                            onClick={this.handleSaveGame.bind(this, resId)}
                            buttonStyle={inlineStyles.resultsDialogButton}
                        />}

                        <TextField
                            disabled={this.state.gameSaved}
                            hintText="Game description (max 255 char)"
                            underlineStyle={inlineStyles.tfUnderlineStyle}
                            underlineFocusStyle={inlineStyles.tfUnderlineFocusStyle}
                            style={{marginLeft: "20px"}}
                            errorText={this.state.errorText}
                            errorStyle={{bottom:3, fontSize:"medium"}}
                            onChange={(()=>{return ((e, value)=>this.setState({gameDescription: value}));})()}
                        />




                </div>
            </div>


        );
    }


}

ResultsDialog.propTypes = {
    gameResult: PropTypes.array.isRequired,
    saveGame: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired
};


export default ResultsDialog;

















