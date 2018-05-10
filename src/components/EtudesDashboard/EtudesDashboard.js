import React from "react";
import NavBar from "../NavBar";

import {connect} from "react-redux";

import {wsConnect, wsSendJoinRoomPlay, wsSendLeaveRoomTables, wsSendUpdateTimeLeft} from "../../actions/WsClientActions";
import GameReturnFrame from '../GameReturnFrame';
import EtudesTable from './EtudesTable';
import {getCurrentGameId} from "../../selectors/gameSelector";
import {withRouter} from "react-router-dom";
import {getUser} from "../../selectors/userSelector";

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



class EtudesDashboard extends React.Component {

    constructor(props) {
        super(props);


    }

    componentDidMount() {

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


    render() {



        let inGame = !!this.props.gameId;

        //if own profile, source of information is logged in user


        return (

            <div style={{textAlign: 'center'}}>
                <NavBar/>
                {inGame &&
                    <GameReturnFrame/>
                }






                <div style={{padding: "50px", position:"relative"}}>



                    <div>
                        <EtudesTable dispatch={this.props.dispatch}/>
                    </div>



                </div>


            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}


export default connect(
    mapStateToProps
)(EtudesDashboard);



