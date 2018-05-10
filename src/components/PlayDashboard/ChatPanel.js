import React from "react";
import TextField from 'material-ui/TextField';
import {ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import InsertEmoji from 'material-ui/svg-icons/editor/insert-emoticon';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

import {wsSendChatMessageSend} from "../../actions/WsClientActions";
import {
    getChatMessages, getCurrentGameChatMessages
} from "../../selectors/gameSelector";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';

const styles={
    containerDiv:{
        width:250,
        height:250,
        backgroundColor:"#42454c",
        display:"flex",
        flexDirection:"column",
        padding:5,
        margin: "0 5px 5px 5px"

    },
    typeMessageBox:{
        display: "flex",
        height: 50,
        backgroundColor: "white",
        //paddingLeft:15,
        marginTop:5
    },
    scrollbarsStyle:{

        //backgroundColor: "#213d34"
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

            this.props.dispatch(wsSendChatMessageSend(msgObj, this.props.gameId));//TODO if fails, can display error, keep message in TextField

        }

    }

    messageEdited(msg){
        this.setState({messageToSend: msg});
    }
    addEmoji(){

    }
    componentDidUpdate(){
        let {scrollbars} = this.refs;
        scrollbars.scrollToBottom();
    }
//asdasddfsdf
    render(){
console.log("CHAT PANEL");
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


            <div style={styles.wrapper}>
                    <div style={styles.header}>Chat</div>
                    <Scrollbars style={styles.scrollbarsStyle}
                                hideTracksWhenNotNeeded={false}
                                ref="scrollbars"
                                renderThumbVertical={props => < div {...props} style={styles.verticalThumb}/>}>

                            {listItems}

                    </Scrollbars>
            </div>

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
        chatMessages: getCurrentGameChatMessages(state),
    };
}



export default withRouter(connect(
    mapStateToProps
)(ChatPanel));



