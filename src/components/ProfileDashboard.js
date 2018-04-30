import React from "react";
import NavBar from "./NavBar";


import {httpGetUser} from '../actions/http/userActions';
import SavedGamesTable from './SavedGamesTable';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import SmileyFace from 'material-ui/svg-icons/editor/insert-emoticon';
import SavedGames from 'material-ui/svg-icons/content/save';
import Settings from 'material-ui/svg-icons/action/settings';
import RatingStar from 'material-ui/svg-icons/toggle/star';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getUser} from "../selectors/userSelector";
import {getCurrentGameId} from '../selectors/gameSelector';
import PropTypes from 'prop-types';
import { BeatLoader} from 'react-spinners';
import LetterAvatar from './LetterAvatar';
import {wsConnect, wsSendJoinRoomPlay, wsSendLeaveRoomTables, wsSendUpdateTimeLeft} from "../actions/WsClientActions";
import GameReturnFrame from './GameReturnFrame';


const styles = {
    statsRatingContainer: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        minWidth:400,
        height: 235,
        minHeight: 235,
        alignItems: "center",
        padding: 5,
        backgroundColor: "#42454c",
        justifyContent: "center",
        marginTop:40
    },
    gameStatsContainer: {},
    ratingContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#4f525a",
        flexGrow:1


    },
    ratingIcon: {
        width: 70,
        height: 70,
        color: "#d0ab44"
    },
    ratingText: {
        fontSize: 60,
        color: "#d0ab44"
    },
    statsHeaderRow: {
        backgroundColor: "#4f525a"
    },
    statsHeaderColumn: {
        color: "#d0ab44"
    },
    spinnerDiv:{
        top: "50%",
        left:0,
        right:0,
        position: "absolute"
    },
    userInfoContainer:{
        display:"flex",
        flexDirection: "column",
        width: 300,
        minWidth:300,//assadasd
        height: 235,
        minHeight: 235,
        alignItems: "center",
        padding: 5,
        backgroundColor: "#42454c",
        justifyContent: "center",
        marginTop:40,
        marginLeft: 20
    },
    mainContainer:{
        display:"flex"
    },
    profileInfo:{
        backgroundColor: "#4f525a",
        display: "flex",
        flexDirection: "column",
        width:"100%",
        height:"100%",
        alignItems:"center"
    },
    profileItemLabel:{
        width:110,
        textAlign:"right",
        marginRight:10,
        color:"#d0ab44"
    },
    profileItemText:{
        color: "white"
    },
    profileItemRow:{
        display:"flex",
        width:"100%",
        padding:5
    },
    inkBarStyle:{
        backgroundColor: "#d0ab44",
        marginTop:"-3",
        height: 3
    },
    profileTabs:{
        backgroundColor: "#42454c",
        height:55,
        alignItems:"center",
        minWidth:400
    },
    avatarContainer:{
      display: "flex",
      alignItems: "center",
      //height:60,
     // padding:10,

    },
    avatarImageDiv:{
        width:"60px",
        height:"60px",
        borderRadius: 30,
        fontSize: 35,
        lineHeight: "55px",
        flexGrow:0,
        flexShrink: 0
    },
    avatarText:{
        fontSize: "x-large",
        marginLeft:25,
        overflow: "hidden",
        textOverflow: "ellipsis"
    }




};



class ProfileDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabIndex: '1',
            userProfile: null,
            profileLoaded: false,
            targetUserId: props.match.params.id
        };
    }


    handleChange = (value) => {
        this.setState({tabIndex: value, });
    };


    componentDidMount() {
       this.getTargetUser(this.state.targetUserId);

        if (!window.socketConnection){
            this.props.dispatch(wsConnect())
                .then(()=>{
                    this.props.dispatch(wsSendJoinRoomPlay())
                        .catch((error)=>{ if (error===401){ this.props.history.push('/'); }});
                });
        }
        else{
            this.props.dispatch(wsSendLeaveRoomTables())
                .catch((error)=>{ if (error===401){ this.props.history.push('/'); }});

            this.props.dispatch(wsSendUpdateTimeLeft())
                .catch((error)=>{ if (error===401){ this.props.history.push('/'); }});


        }
    }


    componentDidUpdate(prevProps, prevState) {

        if(prevProps === undefined) {
            return false
        }

        if (this.state.targetUserId !== this.props.match.params.id) {
            this.setState({targetUserId: this.props.match.params.id, profileLoaded: false });
            this.getTargetUser(this.props.match.params.id);

        }

    }

    getTargetUser(userId){
        this.props.dispatch(httpGetUser(userId))
            .then((u) => {
                this.setState({userProfile: u, profileLoaded: true});
            })
            .catch(() => {
                console.log('get profile error!');
            });
    }


    render() {

        ///dfgdfgdfgdfghhdfgdfdfgdfgd

        let {userProfile} = this.state;

        let wins, draws, losses, total, winsP, lossesP, drawsP;
        let avatarStyle, avatarLetter;
        if (userProfile !== null){
            wins = userProfile.wins;
            losses = userProfile.losses;
            draws = userProfile.draws;
            total = wins+losses+draws;
            winsP = total>0 ? Math.floor(wins/total*100)+"%" : "--";
            drawsP = total>0 ? Math.floor(draws/total*100)+"%" : "--";
            lossesP = total>0 ? Math.floor(losses/total*100)+"%" : "--";


        }

        let inGame = !!this.props.gameId;

        return (

            <div style={{textAlign: 'center'}}>
                <NavBar selectedTab={1}/>
                {inGame &&
                    <GameReturnFrame/>
                }

                <div style={{padding: "50px", position:"relative"}}>

                    <div style={styles.spinnerDiv}>
                        <BeatLoader
                            color={'red'}
                            size={12}
                            loading={!this.state.profileLoaded}/>
                    </div>

                    <div style={{height:60, padding:10}}>
                        {this.state.profileLoaded &&

                                <div style={styles.avatarContainer}>
                                    <LetterAvatar username={userProfile.email}/>
                                    <div style={styles.avatarText}>{userProfile.email}</div>
                                </div>
                        }
                    </div>
                    {this.state.profileLoaded &&
                        <Tabs  value={this.state.tabIndex}
                                onChange={this.handleChange}
                                tabItemContainerStyle={styles.profileTabs}
                                inkBarStyle={styles.inkBarStyle}>

                            <Tab label="Overview"
                                 value="1"
                                 icon={<SmileyFace style={{margin:"20px"}}/>}>

                                <div style={styles.mainContainer}>





                                    <div style={styles.statsRatingContainer}>



                                        <div style={styles.gameStatsContainer}>
                                            <Table>
                                                <TableHeader style={styles.statsHeaderRow} displaySelectAll={false}
                                                             adjustForCheckbox={false}>
                                                    <TableRow>
                                                        <TableHeaderColumn
                                                            style={styles.statsHeaderColumn}>Wins</TableHeaderColumn>
                                                        <TableHeaderColumn
                                                            style={styles.statsHeaderColumn}>Draws</TableHeaderColumn>
                                                        <TableHeaderColumn
                                                            style={styles.statsHeaderColumn}>Losses</TableHeaderColumn>
                                                        <TableHeaderColumn style={styles.statsHeaderColumn}>Total
                                                            games</TableHeaderColumn>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody displayRowCheckbox={false}>
                                                    <TableRow>
                                                        <TableRowColumn>{wins}</TableRowColumn>
                                                        <TableRowColumn>{draws} </TableRowColumn>
                                                        <TableRowColumn>{losses}</TableRowColumn>
                                                        <TableRowColumn>{total}</TableRowColumn>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableRowColumn>{ winsP}</TableRowColumn>
                                                        <TableRowColumn>{drawsP} </TableRowColumn>
                                                        <TableRowColumn>{lossesP}</TableRowColumn>
                                                        <TableRowColumn>{"100%"}</TableRowColumn>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>


                                        <div style={styles.ratingContainer}>

                                            <RatingStar style={styles.ratingIcon}/>
                                            <div style={styles.ratingText}>{userProfile && userProfile.rating}</div>

                                        </div>
                                    </div>


                                    <div style={styles.userInfoContainer}>

                                        <div style={styles.profileInfo}>

                                            <div>
                                                <h3 style={{color:"#d0ab44"}}>User info</h3>
                                            </div>
                                            <div style={styles.profileItemRow}>
                                                <div style={styles.profileItemLabel}>registered:</div>
                                                <div style={styles.profileItemText}>{userProfile.created_at}</div>
                                            </div>

                                            <div style={styles.profileItemRow}>
                                                <div style={styles.profileItemLabel}>Gender:</div>
                                                <div style={styles.profileItemText}>{userProfile.gender ? userProfile.gender : ""}</div>
                                            </div>

                                            <div style={styles.profileItemRow}>
                                                <div style={styles.profileItemLabel}>Birthday:</div>
                                                <div style={styles.profileItemText}>{userProfile.birthday ? userProfile.birthday : ""}</div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Tab>
                            <Tab label="Saved games" value="2" icon={<SavedGames/>}>
                                <div>
                                    <SavedGamesTable targetUserId={this.state.targetUserId}
                                                     dispatch={this.props.dispatch}/>
                                </div>
                            </Tab>
                            <Tab label="Settings" value="3" icon={<Settings/>}>
                                <div>
                                    My settingss :)
                                </div>
                            </Tab>
                        </Tabs>}


                </div>


            </div>
        );
    }
}

ProfileDashboard.propTypes = {
    user: PropTypes.object.isRequired,
    gameId: PropTypes.string
};

function mapStateToProps(state) {
    return {
        user: getUser(state),
        gameId: getCurrentGameId(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(ProfileDashboard));


