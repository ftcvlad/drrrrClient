import React from "react";
import {List, ListItem} from 'material-ui/List';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import UserProfile from 'material-ui/svg-icons/social/person';
import MessageUser from 'material-ui/svg-icons/communication/email';
//import Flag from "react-flags";
import Flag from 'react-world-flags'
import IconButton from 'material-ui/IconButton';
import {connect} from "react-redux";
import {getCurrentGameInfo, getCurrentGameState} from "../selectors/gameSelector";
import {withRouter} from "react-router-dom";


const styles={
    listItemStyle:{
         textAlign:"left",
         overflowWrap: "break-word",
         color:"#eccece"
    },
    listItemInnerDiv:{
        padding: "5px 16px 5px 16px"
    },
    verticalThumb:{
        width:"20px",
        backgroundColor:"#9c1818"
    },
    containerDiv:{
        width:250,
        height:225,
        backgroundColor:"#42454c",
        display:"flex",
        flexDirection:"column",
        padding:5,
        margin: "0 5px 5px 5px"

    },
    smallIcon:{
        color: "#d0ab44",
        width:22,
        height:22
    },
    smallButton:{
        padding:0,
        width:22,
        height:22,
        margin: "0 2px 0 2px"
    },
    userListItemContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    playerListContainer:{
        minHeight:60
    },
    header:{
        textAlign: "left",
        color: "#d0ab44",
        fontFamily: "monospace",
        borderBottom: "1px solid white",
        paddingLeft:5
    },
    wrapper:{
        backgroundColor: "#4f525a",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    username:{
        maxWidth: "135px",
        overflow: "hidden",
        overflowWrap: "normal",
        textOverflow: "ellipsis"
    },
    flag:{
        height: "13",
        marginRight: "3px"
    }
};

class ParticipantPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    openPersonProfile(personId) {
        console.log(personId);

        this.props.history.push('/profile/'+personId);

    }

    sendPrivateMessage(personId){

    }

    generateList(users){//sddfg
        let userList = [];
        for (let i = 0; i < users.length; i++) {
            userList.push(<ListItem key={i}
                                      style={styles.listItemStyle}
                                      innerDivStyle={styles.listItemInnerDiv}
                                      onClick={this.openPersonProfile.bind(this, users[i].id)}
                                      children={
                                          <div style={styles.userListItemContainer} key={i}>


                                              <div style={{display:"flex"}}>
                                                  <Flag code={ "GB" } style={styles.flag}/>
                                                  <div title={users[i].username} style={styles.username}>{users[i].username}</div>
                                              </div>


                                              <div>
                                                  <IconButton iconStyle={styles.smallIcon}
                                                              style={styles.smallButton}
                                                              onClick={this.openPersonProfile.bind(this, users[i].id)}>
                                                      <UserProfile hoverColor={"#9c1818"}/>
                                                  </IconButton>
                                                  <IconButton iconStyle={styles.smallIcon}
                                                              style={styles.smallButton}
                                                              onClick={this.sendPrivateMessage.bind(this, users[i].id)}>
                                                      <MessageUser hoverColor={"#9c1818"}/>
                                                  </IconButton>
                                              </div>


                                          </div>}/>);
        }
        return userList;
    }

    render() {
        console.log("participantPanel");
        let {gameInfo} = this.props;


        let playerList = this.generateList(gameInfo.players);
        let watcherList = this.generateList(gameInfo.watchers);




        return <div style={styles.containerDiv}>
            <div style={styles.wrapper}>
                <div style={styles.header}>Players</div>
                <List style={styles.playerListContainer}>
                    {playerList}
                </List>

                <div style={styles.header}>Watchers</div>
                <Scrollbars style={styles.scrollbarsStyle}
                            hideTracksWhenNotNeeded={false}
                            ref="scrollbars"
                            renderThumbVertical={props => < div {...props} style={styles.verticalThumb}/>}>

                    {watcherList}

                </Scrollbars>
            </div>



        </div>;
        }


}

ParticipantPanel.propTypes={
    gameInfo: PropTypes.object.isRequired,
};

//
//
// function mapStateToProps(state) {
//     return {
//         gameInfo: getCurrentGameInfo(state)
//     };
// }


export default withRouter(ParticipantPanel);

// export default withRouter(connect(
//     mapStateToProps
// )(ParticipantPanel));

