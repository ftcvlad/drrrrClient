import React from "react";
import NavBar from "../NavBar";

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
import {httpGetSavedGameList} from '../../actions/http/profileActions';
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

class SavedGamesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {gameList: [], dialogOpen: false, moves:[], boardState:[], playsWhite:false};
    }

    componentDidMount() {

        this.props.dispatch(httpGetSavedGameList(this.props.targetUserId))
            .then((res) => {
                this.setState({gameList: res});
            });
    }

    viewGame(moves, boardState, playsWhite) {
        this.setState({dialogOpen:true, moves: moves, boardState: boardState, playsWhite});
    }

    handleCloseGame(){
        this.setState({dialogOpen:false});
    }

    getTableRows(gameList, targetUserId) {


        let tableRows = [];

        for (let i = 0; i < gameList.length; i++) {

            let myRatingBefore, myRatingAfter, oppRatingBefore, oppRatingAfter, result, playsWhite, opponentUsername, userUsername;


            if (gameList[i].user_id == targetUserId){
                myRatingBefore =  gameList[i].u_rating_before ;
                myRatingAfter =  gameList[i].u_rating_after ;
                oppRatingBefore = gameList[i].o_rating_before;
                oppRatingAfter =  gameList[i].o_rating_after ;
                result = gameList[i].match_result;
                playsWhite = gameList[i].plays_white;
                opponentUsername = gameList[i].o_username;
                userUsername = gameList[i].u_username;
            }
            else if (gameList[i].opponent_id == targetUserId){
                myRatingBefore =  gameList[i].o_rating_before ;
                myRatingAfter =  gameList[i].o_rating_after ;
                oppRatingBefore = gameList[i].u_rating_before;
                oppRatingAfter =  gameList[i].u_rating_after ;
                result = 2-gameList[i].match_result;
                playsWhite = 1-gameList[i].plays_white;
                opponentUsername = gameList[i].u_username;
                userUsername = gameList[i].o_username;
            }

            let date = new Date(gameList[i].created_at*1000);

            let hours = "0" + date.getHours();//asdasas
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();

            let day = "0" + date.getDate();
            let month = "0" + (date.getMonth()+1);
            let year = ""+date.getFullYear();

            let formattedDayTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            let formattedYearTime = day.substr(-2) + '/' + month.substr(-2) + '/' + year.substr(-2);



            let checkerStyle = Object.assign({}, styles.checkerDiv,  playsWhite ? {backgroundColor:"white"}:{backgroundColor:"#8c0606"});
            let firstUserStyle = Object.assign({}, styles.tableColumnUser, {backgroundColor: "#dcdcdc"});
            let columnResult = Object.assign({}, styles.tableColumnResult, {backgroundColor: "#dcdcdc"} );
            let columnChecker = Object.assign({}, styles.tableColumnChecker, {backgroundColor: "#dcdcdc"} );

            tableRows.push(<TableRow key={i}>
                <TableRowColumn style={styles.tableColumnTime}>
                    <div>{formattedYearTime}</div>
                    <div>{formattedDayTime}</div>
                </TableRowColumn>
                <TableRowColumn style={firstUserStyle}>
                    <div style={styles.usernameText} title={userUsername}>{userUsername}</div>
                    <div style={{paddingTop:3}} title={"rating before / after"}>
                        <RatingStar style={styles.ratingIcon} tooltip={"rating before/after"}/>
                        <span>{myRatingBefore+ " / "}</span>
                        <span>{myRatingAfter}</span>
                    </div>

                </TableRowColumn>
                <TableRowColumn style={columnChecker}>
                    <div style={checkerStyle}></div>
                </TableRowColumn>
                <TableRowColumn style={columnResult}>{matchResultTypes[result]}</TableRowColumn>
                <TableRowColumn style={styles.tableColumnUser}>
                    <div style={styles.usernameText} title={opponentUsername}>{opponentUsername}</div>
                    <div style={{paddingTop:3}} title={"rating before / after"}>

                        <RatingStar  style={styles.ratingIcon} tooltip={"rating before/after"}/>
                        <span>{oppRatingBefore+ " / "}</span>
                        <span>{oppRatingAfter}</span>
                    </div>

                </TableRowColumn>



                <TableRowColumn style={{paddingRight:5}} title={gameList[i].description}>{gameList[i].description}</TableRowColumn>
                <TableRowColumn style={styles.tableButtonColumn}>

                    <RaisedButton label="View"
                                  buttonStyle={styles.button}
                                  labelStyle={styles.buttonLabel}
                                  onClick={this.viewGame.bind(this, gameList[i].moves, gameList[i].board_state, playsWhite!==0)}/>


                </TableRowColumn>

            </TableRow>);
        }
        return tableRows;//asdasdsad
    }

    render() {


        let {gameList} = this.state;
        let tableRows = this.getTableRows(gameList, this.props.targetUserId);


        let thResultStyle = Object.assign({}, styles.tableColumnResult, styles.thColumn );
        let thTimeStyle = Object.assign({}, styles.tableColumnTime, styles.thColumn );
        let thUserStyle = Object.assign({}, styles.tableColumnUser, styles.thColumn);
        return (


            <div style={styles.mainContainer}>
                <div style={styles.tableContainer}>
                    <Table>
                        <TableHeader style={styles.thRow} displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={thTimeStyle}>Time</TableHeaderColumn>
                                <TableHeaderColumn style={thUserStyle}>User</TableHeaderColumn>
                                <TableHeaderColumn style={styles.tableColumnChecker}></TableHeaderColumn>
                                <TableHeaderColumn style={thResultStyle}>Result</TableHeaderColumn>
                                <TableHeaderColumn style={thUserStyle}>Opponent</TableHeaderColumn>
                                <TableHeaderColumn style={styles.thColumn}>Description</TableHeaderColumn>
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
                        bodyStyle={{overflowY:"scroll"}}
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
            </div>







        );
    }
}

SavedGamesTable.propTypes = {
    targetUserId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};





export default SavedGamesTable;