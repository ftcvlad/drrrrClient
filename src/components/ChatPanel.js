import React from "react";
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

import {sendMessage} from "../functions/WebSocketStuff";

const styles={
    containerDiv:{
        width:"300px",
        height:"400px",
        backgroundColor:"red"
    },
    typeMessageBox:{
        display: "flex"
    }
};

class ChatPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {messageToSend:""};
    }

    sendMessage(){

        let msgObj = {
            msg: this.state.messageToSend
        };
        sendMessage(msgObj, this.props.gameId);
    }

    messageEdited(msg){
        this.setState({messageToSend: msg});
    }

    render(){
        let {chatMessages} = this.props;
        let listItems = [];

        //chatMessage == {senderId, message, senderName}
        for (let i=0; i<chatMessages.length; i++){
            listItems.push(<ListItem key={i} primaryText={chatMessages[i].msgText}  />);
        }

        return <div style={styles.containerDiv}>

            <div>
                <List>
                    <ListItem primaryText="Inbox"  />
                    {listItems}
                </List>
            </div>
            <div style={styles.typeMessageBox}>
                <TextField hintText="Type message"
                           onChange={(e, msg)=>this.messageEdited.call(this, msg)}/>
                <IconButton iconStyle={styles.smallIcon}
                    //hoveredStyle={styles.iconHovered}
                    //style={styles.smallButton}

                            onClick={this.sendMessage.bind(this)}>
                    <ContentSend />
                </IconButton>
            </div>



                </div>;
    }

}

ChatPanel.propTypes={

    gameId: PropTypes.string.isRequired,
    chatMessages: PropTypes.array.isRequired


};

export default ChatPanel;