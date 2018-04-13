import React from "react";
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import InsertEmoji from 'material-ui/svg-icons/editor/insert-emoticon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

import {sendMessage} from "../functions/WebSocketStuff";
import {getChatMessages} from "../selectors/gameSelector";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';

const styles={
    containerDiv:{
        width:250,
        height:300,
        backgroundColor:"#42454c",
        display:"flex",
        flexDirection:"column",
        padding:5

    },
    typeMessageBox:{
        display: "flex",
        height: 50,
        backgroundColor: "white",
        //paddingLeft:15,
        marginTop:5
    },
    scrollbarsStyle:{

        backgroundColor: "#4f525a"
    },
    listItemsContainer:{

    },
    verticalThumb:{
        width:"20px",
        backgroundColor:"#9c1818"
    },
    senderStyle:{
        color:"#d0ab44",
        fontSize: "small",
        textDecoration: "underline"
    },
    listItemStyle:{
        textAlign:"left",
        overflowWrap: "break-word",
        color:"#eccece"
    },
    listItemInnerDiv:{
        padding: "5px 16px 5px 16px"
    },
    textBoxUnderLineStyle:{
        display:"none"
    },
    smallIcon:{
        color: "#691010"
    },
    smallButton:{
        padding:0
    },
    iconHovered:{
        backgroundColor:"#b7b5b5"
    }
};

class ChatPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {messageToSend:""};
    }

    sendMessage(){

        let msg = this.state.messageToSend;
        if (msg !== ""){
            let msgObj = {
                msg
            };
            this.setState({messageToSend:""});
            sendMessage(msgObj, this.props.gameId);
        }

    }

    messageEdited(msg){
        this.setState({messageToSend: msg});
    }
    addEmoji(){

    }

    render(){

        let {chatMessages} = this.props;
        let listItems = [];

        //chatMessage == {senderId, msgText, sender}
        for (let i=0; i<chatMessages.length; i++){
            listItems.push(<ListItem key={i}
                                     style={styles.listItemStyle}
                                     innerDivStyle={styles.listItemInnerDiv}
                                     children={<span key={"cSender"+i}
                                                     style={styles.senderStyle}>{chatMessages[i].sender+": "}</span>}
                                     primaryText={chatMessages[i].msgText}  />);
        }

        return <div style={styles.containerDiv}>




                    <Scrollbars style={styles.scrollbarsStyle}
                                hideTracksWhenNotNeeded={false}
                                ref="scrollbars"
                                renderThumbVertical={props => < div {...props} style={styles.verticalThumb}/>}>

                            {listItems}

                    </Scrollbars>


                    <div style={styles.typeMessageBox}>

                        <IconButton iconStyle={styles.smallIcon}

                                    style={styles.smallButton}

                                    onClick={this.addEmoji.bind(this)}>
                            <InsertEmoji hoverColor={"#cd0000"}/>
                        </IconButton>

                        <TextField hintText="Type message"
                                   underlineStyle={styles.textBoxUnderLineStyle}
                                   value={this.state.messageToSend}
                                   onChange={(e, msg)=>this.messageEdited.call(this, msg)}/>
                        <IconButton iconStyle={styles.smallIcon}



                                    onClick={this.sendMessage.bind(this)}>
                            <ContentSend hoverColor={"#cd0000"} />
                        </IconButton>
                    </div>



                </div>;
    }

}//asdsadsdfsdfsdf

ChatPanel.propTypes={

    gameId: PropTypes.string.isRequired,
    chatMessages: PropTypes.array.isRequired


};

function mapStateToProps(state) {
    return {
        chatMessages:getChatMessages(state)
    };
}


export default withRouter(connect(
    mapStateToProps
)(ChatPanel));


