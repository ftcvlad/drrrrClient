import {connect} from 'react-redux';
import {login, register} from '../actions/authActions';
import PropTypes from 'prop-types';
import React from 'react';
import {getUser} from "../selectors/userSelector";
import NavBar from "./NavBar";
import RegisterFormRedux from "./RegisterForm";
import LoginFormRedux from "./LoginForm";
import {wsConnect, wsSendJoinRoomPlay, wsSendLeaveRoomTables, wsSendUpdateTimeLeft} from "../actions/WsClientActions";
import GameReturnFrame from './GameReturnFrame';
import {getCurrentGameId} from "../selectors/gameSelector";
import Divider from 'material-ui/Divider';




const PlayPageImg = require('./images/description/PlayPage.jpg');
const TablesPageImg = require('./images/description/TablesPage.png');
const ProfileOverviewImg = require('./images/description/ProfileOverview.png');
const ProfileSavedGamesImg = require('./images/description/ProfileSavedGames.png');
const GameReturnFrameImg = require('./images/description/GameReturnFrame.png');

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
    containerDiv: {
        display: "flex",
        justifyContent: "center",
        padding:50
    },
    rulesDiv: {
        display: "flex",
        flexDirection: "column",
        maxWidth:700
    },
    authFormContainer: {
        width: 300,
        marginLeft:50
    },
    dividerStyle:{
        margin:30,
        height:3,
        backgroundColor:"#9c1818"
    }
};

class MainDashboard extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loginError: "",
            registerError: ""
        }
    }


    componentWillMount() {

        if (!window.socketConnection) {
            this.props.dispatch(wsConnect())
                .then(() => {
                    this.props.dispatch(wsSendJoinRoomPlay())
                        .catch((error) => {
                        });
                });
        }
        else {
            this.props.dispatch(wsSendLeaveRoomTables())
                .catch((error) => {
                });

            this.props.dispatch(wsSendUpdateTimeLeft())
                .catch((error) => {
                });

        }
    }

    clearState() {
        this.setState({loginError: "", registerError: ""});
    }

    login(data) {

        this.clearState();
        this.props.dispatch(login(data))
            .catch((errMsg) => {
                this.setState({loginError: errMsg});
            });

    }

    register(data) {
        this.clearState();
        this.props.dispatch(register(data))
            .catch((errMsg) => {
                this.setState({registerError: errMsg});
            });

    }

    render() {
        let {user} = this.props;
        let inGame = !!this.props.gameId;

        let userLoggedIn = Object.keys(user).length !== 0;

        return (
            <div className="">
                <NavBar />
                {inGame &&
                <GameReturnFrame/>
                }


                <div style={styles.containerDiv}>
                    <div style={styles.rulesDiv}>


                        <h1>Instructions</h1>




                        <h2>Tables dashboard</h2>
                        <Card>

                            <CardMedia
                                overlay={<CardTitle  subtitle="Displays list of current games"/>}
                            >
                                <img src={TablesPageImg} alt=""/>
                            </CardMedia>

                            <CardText>
                                After logging in go to the Tables dashboard.
                                <h3>Game list panel</h3>
                                <p>
                                    Game list panel shows list of currently available games. Each line represents a game.
                                    You can see rating of players that have already joined and if there are empty slots available.
                                    You can also see overall time reserve given for each player's moves.
                                    If you select a game, you will see players and watchers that have already joined the game
                                    in Participant panel on the right. Play button is shown if the game has empty slots.
                                    If both players have already joined the game you can watch the game by pressing Watch button
                                </p>
                                <h3>Participant panel</h3>
                                <p>You can open player's profile by clicking profile button on the right of player's nickname</p>

                                <h3>Create game panel</h3>
                                <p>To create a game select time reserve and press create</p>

                            </CardText>

                        </Card>

                        <Divider style={styles.dividerStyle}/>

                        <h2>Play dashboard</h2>
                        <Card>

                            <CardMedia
                                overlay={<CardTitle subtitle="All gameplay happens here"/>}
                            >
                                <img src={PlayPageImg} alt=""/>
                            </CardMedia>
                            <CardText>
                                <h3>Board panel</h3>
                                <p>Board panel in the middle shows current board state. Selected checker is highlighted with yellow border.
                                Last move is marked with a brown frame. In order to move select a checker that is able to make a move
                                    and then click target cell. </p>

                                <h3>Moves panel</h3>
                                <p>Moves panel lets you go to the past game state by selecting one of previous turns. When in this
                                replaying state you cannot do new moves. In order to return to the latest state select the latest move from the list
                                . Playback buttons at the bottom help you navigate through the moves. </p>

                                <h3>Player panel</h3>
                                <p>Each player has his "personal" area. It displays player's rating, status, time left, if it is his turn
                                    and action buttons available for him. </p>

                                <h3>Chat panel</h3>
                                <p>You can send a message to every person in the game room</p>
                            </CardText>

                        </Card>

                        <Divider style={styles.dividerStyle}/>

                        <h2>Profile overview</h2>
                        <Card>

                            <CardMedia
                                overlay={<CardTitle subtitle="Player profile overview"/>}
                            >
                                <img src={ProfileOverviewImg} alt=""/>
                            </CardMedia>

                            <CardText>
                                <p>Profile overview contains general player information,
                                    including statistics, rating and personal information</p>

                            </CardText>

                        </Card>

                        <Divider style={styles.dividerStyle}/>

                        <h2>Saved games</h2>
                        <Card>

                            <CardMedia
                                overlay={<CardTitle subtitle="Saved games available here"/>}
                            >
                                <img src={ProfileSavedGamesImg} alt=""/>
                            </CardMedia>

                            <CardText>
                              <p>If you have saved games, they are available on Saved games tab. Press view to go through game moves.
                              Your games are available for viewing to every other player opening your profile</p>
                            </CardText>

                        </Card>

                        <Divider style={styles.dividerStyle}/>

                        <h2>Return to game frame</h2>
                        <Card>

                            <CardMedia
                                overlay={<CardTitle subtitle="Lets quickly returning to your game"/>}
                            >
                                <img style={{width:200}} src={GameReturnFrameImg} alt=""/>
                            </CardMedia>

                            <CardText>
                                <p>If you are in a game you can still navigate through the application. In this case Game return frame
                                is shown on every page. It contains important information about the game and lets you quickly
                                    return to the game</p>
                            </CardText>

                        </Card>


                    </div>
                    {!userLoggedIn &&
                    <div style={styles.authFormContainer}>
                        <LoginFormRedux onSubmit={this.login.bind(this)}
                                        label={"Sign in"}
                                        errorMsg={this.state.loginError}/>
                        <RegisterFormRedux onSubmit={this.register.bind(this)}
                                           label={"Register"}
                                           errorMsg={this.state.registerError}/>
                    </div>}


                </div>
            </div>
        );
    }
}

MainDashboard.propTypes = {
    user: PropTypes.object,
    gameId: PropTypes.string
};


function mapStateToProps(state) {
    return {
        user: getUser(state),
        gameId: getCurrentGameId(state)
    };
}


export default connect(
    mapStateToProps
)(MainDashboard);


