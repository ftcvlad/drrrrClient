import React from "react";
import NavBar from "./NavBar";

import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';

import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import RatingStar from 'material-ui/svg-icons/toggle/star';
import {httpGetEtudeList} from '../actions/http/profileActions';
import ViewGameArea from './ViewGameArea';

import EtudeArea from './EtudeArea';
const matchResultTypes = ["Lose", "Draw", "Win"];

const styles = {
    button: {
        border: "1px solid #9c1818",
        height: 30,
        lineHeight: 2
    },
    buttonLabel: {
        color: "#9c1818"
    },
    tableButtonColumn: {
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dialogButton:{
        backgroundColor: "#9c1818"
    },
    dialogActionsContainer:{
        //display:"flex",
        // justifyContent: "space-around",
        paddingRight:"38px"
    },
    checkerDiv:{
        width:15,
        height:15,
        borderRadius:14,
        boxShadow: "2px 2px 5px black"
    },
    tableColumnChecker:{
        width:15,
        whiteSpace: "initial",
        paddingRight: 5,
        paddingLeft:3,
        textAlign: "center"
    },
    tableColumnResult:{
        width:35,
        whiteSpace: "initial",
        paddingRight: 15,
        paddingLeft:24,
        textAlign: "center"
    },
    tableColumnTime:{
        width:60,
        whiteSpace: "initial",
        paddingRight: 5,
        paddingLeft:24,
        textAlign: "center"
    },
    tableColumnUser:{
        textAlign: "center",
        paddingRight:5
    },
    mainContainer:{
        display:"flex",
        paddingTop:30
    },
    tableContainer:{
        flexShrink:0,
        width: 800,
        backgroundColor: "#42454c",
        marginRight:20,
        padding:5,
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        minHeight:300
    },
    thColumn:{
        color: "#d0ab44"
    },
    thRow:{
        backgroundColor: "#4f525a"
    },
    ratingIcon:{
        color: "#d0ab44",
        width:13,
        height:13
    },
    usernameText:{
        fontWeight:"bold",
        textOverflow:"ellipsis",
        overflow:"hidden"
    }
};

class EtudesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {etudeList: [], dialogOpen: false, correctMoves:[], boardState:[]};
    }

    componentDidMount() {

        this.props.dispatch(httpGetEtudeList())
            .then((res) => {
                this.setState({etudeList: res});
            });
    }

    solveEtude(correctMoves, boardState) {
        this.setState({dialogOpen:true, correctMoves: correctMoves, boardState: boardState});
    }

    handleCloseEtude(){
        this.setState({dialogOpen:false});
    }

    getTableRows(etudeList) {


        let tableRows = [];

        for (let i = 0; i < etudeList.length; i++) {

           let description = etudeList[i].description;
           let correctMoves = etudeList[i].moves;
           let boardState = etudeList[i].board_state;

            tableRows.push(<TableRow key={i}>
                <TableRowColumn >{i}</TableRowColumn>

                <TableRowColumn>{description} </TableRowColumn>

                <TableRowColumn style={styles.tableButtonColumn}>

                    <RaisedButton label="View"
                                  buttonStyle={styles.button}
                                  labelStyle={styles.buttonLabel}
                                  onClick={this.solveEtude.bind(this, correctMoves, boardState)}/>


                </TableRowColumn>

            </TableRow>);
        }
        return tableRows;
    }

    render() {


        let {etudeList} = this.state;
        let tableRows = this.getTableRows(etudeList);



        return (


            <div style={styles.mainContainer}>

                {/*<div style={styles.spinnerDiv}>*/}
                    {/*<BeatLoader*/}
                        {/*color={'red'}*/}
                        {/*size={12}*/}
                        {/*loading={!this.state.profileLoaded}/>*/}
                {/*</div>*/}

                <div style={styles.tableContainer}>
                    <Table>
                        <TableHeader style={styles.thRow} displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn >Id</TableHeaderColumn>
                                <TableHeaderColumn >Description</TableHeaderColumn>

                                <TableHeaderColumn></TableHeaderColumn>

                            </TableRow>
                        </TableHeader>


                        <TableBody displayRowCheckbox={false}>
                            {tableRows}
                        </TableBody>
                    </Table>

                    <Dialog
                        title="Solve etude"
                        modal={true}
                        open={this.state.dialogOpen}
                        contentStyle={{width:600}}
                        actionsContainerStyle = {styles.dialogActionsContainer}
                        actions={[
                            <RaisedButton
                                label="Ok"
                                primary={true}
                                onClick={this.handleCloseEtude.bind(this)}
                                buttonStyle = {styles.dialogButton}
                            />,
                        ]}


                    >

                        <EtudeArea

                            correctMoves={this.state.correctMoves}
                            boardState={this.state.boardState}
                        />

                    </Dialog>
                </div>
            </div>







        );
    }
}

EtudesTable.propTypes = {
    dispatch: PropTypes.func.isRequired
};





export default EtudesTable;