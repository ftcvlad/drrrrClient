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


import {getUser} from "../selectors/userSelector";
import {httpGetSavedGameList} from '../actions/http/profileActions';
import ViewGameArea from './ViewGameArea';

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
    }
};

class SavedGamesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {gameList: [], dialogOpen: false, moves:[], boardState:[], playsWhite:false};
    }

    componentDidMount() {
        this.props.dispatch(httpGetSavedGameList(this.props.user.id))
            .then((res) => {
                console.log(res);
                this.setState({gameList: res});
            });
    }

    viewGame(moves, boardState, playsWhite) {
        console.log(moves);

        this.setState({dialogOpen:true, moves: moves, boardState: boardState, playsWhite});
    }

    handleCloseGame(){
        this.setState({dialogOpen:false});
    }

    getTableRows(gameList, userId) {


        let tableRows = [];

        for (let i = 0; i < gameList.length; i++) {

            let myRatingBefore;
            let myRatingAfter ;
            let oppRatingBefore;
            let oppRatingAfter;
            let result;
            let playsWhite;

            if (gameList[i].user_id === userId){
                myRatingBefore =  gameList[i].u_rating_before ;
                myRatingAfter =  gameList[i].u_rating_after ;
                oppRatingBefore = gameList[i].o_rating_before;
                oppRatingAfter =  gameList[i].o_rating_after ;
                result = gameList[i].match_result;
                playsWhite = gameList[i].plays_white;
            }
            else if (gameList[i].opponent_id === userId){
                myRatingBefore =  gameList[i].o_rating_before ;
                myRatingAfter =  gameList[i].o_rating_after ;
                oppRatingBefore = gameList[i].u_rating_before;
                oppRatingAfter =  gameList[i].u_rating_after ;
                result = 2-gameList[i].match_result;
                playsWhite = 1-gameList[i].plays_white;
            }




            tableRows.push(<TableRow key={i}>
                <TableRowColumn>{gameList[i].created_at}</TableRowColumn>
                <TableRowColumn>{playsWhite}</TableRowColumn>
                <TableRowColumn>{matchResultTypes[result]}</TableRowColumn>
                <TableRowColumn>{myRatingBefore}</TableRowColumn>
                <TableRowColumn>{myRatingAfter}</TableRowColumn>
                <TableRowColumn>{"opponent name :("}</TableRowColumn>
                <TableRowColumn>{oppRatingBefore}</TableRowColumn>
                <TableRowColumn>{oppRatingAfter}</TableRowColumn>
                <TableRowColumn>{gameList[i].description}</TableRowColumn>
                <TableRowColumn style={styles.tableButtonColumn}>

                    <RaisedButton label="View"
                                  buttonStyle={styles.button}
                                  labelStyle={styles.buttonLabel}
                                  onClick={this.viewGame.bind(this, gameList[i].moves, gameList[i].board_state, playsWhite!==0)}/>


                </TableRowColumn>

            </TableRow>);
        }
        return tableRows;
    }

    render() {


        let {gameList} = this.state;
        let tableRows = this.getTableRows(gameList, this.props.user.id);

        return (

            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                            <TableHeaderColumn>Plays white</TableHeaderColumn>
                            <TableHeaderColumn>Result</TableHeaderColumn>
                            <TableHeaderColumn>Rating before</TableHeaderColumn>
                            <TableHeaderColumn>Rating after</TableHeaderColumn>
                            <TableHeaderColumn>Opponent</TableHeaderColumn>
                            <TableHeaderColumn>Rating before</TableHeaderColumn>
                            <TableHeaderColumn>Rating after</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>

                        </TableRow>
                    </TableHeader>


                    <TableBody displayRowCheckbox={false}>
                        {tableRows}
                    </TableBody>
                </Table>

                <Dialog
                    title="View saved game"
                    //contentStyle={styles.dialogContent}
                    modal={true}
                    open={this.state.dialogOpen}
                    contentStyle={{width:800}}
                    actionsContainerStyle = {styles.dialogActionsContainer}
                    actions={[
                        <RaisedButton
                            label="Ok"
                            primary={true}
                            onClick={this.handleCloseGame.bind(this)}
                            buttonStyle = {styles.dialogButton}
                        />,
                    ]}


                >

                    <ViewGameArea
                        playsWhite={this.state.playsWhite}
                        moves={this.state.moves}
                        boardState={this.state.boardState}
                    />

                </Dialog>

            </div>


        );
    }
}

SavedGamesTable.propTypes = {
    user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        user: getUser(state)
    };
}


export default (connect(
    mapStateToProps
)(SavedGamesTable));