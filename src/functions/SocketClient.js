import {messageTypes} from '../actions/messageTypes';
import WebSocketAsPromised from 'websocket-as-promised';
import {
    broadcastGameCreatedSuccess,
    receiveChatMessage,
    BroadcastParticipantsChangedToTableSuccess,
    BroadcastParticipantsChangedToTablesSuccess,
    userMoveSucceed,
    broadcastTableRemovedSuccess,
    broadcastGameStartedSuccess,
    broadcastGameFinishedSuccess,
    broadcastConfirmPlayingSuccess,
    confirmPlayingSuccess,
    surrenderSuccess
} from "../actions/WsReceiveActions";
import * as types from "../actions/actionTypes";






//https://stackoverflow.com/questions/37876889/react-redux-and-websockets-with-socket-io
//https://github.com/vitalets/websocket-as-promised
export default class SocketClient {
    wsp;
    dispatch;

    connect(dispatch) {

        this.wsp = new WebSocketAsPromised('ws://localhost:8090/', {
            packMessage: data => JSON.stringify(data),
            unpackMessage: message => JSON.parse(message),
            attachRequestId: (data, requestId) => Object.assign({id: requestId}, data), // attach requestId to message as `id` field
            extractRequestId: data => data && data.id,
        });

        this.dispatch = dispatch;

        this.wsp.onPackedMessage.addListener(data => {//this is a no good :(

            console.log("server message: "+JSON.stringify(data));

            if (data.error){
                console.log(data);
            }
            else if (!data.id){

                if (data.servMessType === messageTypes.BROADCAST_GAME_CREATED){
                    this.dispatch(broadcastGameCreatedSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_PARTICIPANTS_CHANGED_to_table){
                    this.dispatch(BroadcastParticipantsChangedToTableSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_PARTICIPANTS_CHANGED_to_tables){
                    this.dispatch(BroadcastParticipantsChangedToTablesSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.USER_MOVE){
                    this.dispatch(userMoveSucceed(data.data));
                }
                else if (data.servMessType === messageTypes.SEND_CHAT_MESSAGE){
                    this.dispatch(receiveChatMessage(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_TABLE_REMOVED){
                    this.dispatch(broadcastTableRemovedSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_GAME_STARTED){
                    this.dispatch(broadcastGameStartedSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_GAME_FINISHED){
                    this.dispatch(broadcastGameFinishedSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_CONFIRM_PLAYING){
                    this.dispatch(confirmPlayingSuccess(data.data));
                }
                else if (data.servMessType === messageTypes.BROADCAST_SURRENDER){
                    this.dispatch(surrenderSuccess(data.data));
                }
            }

        });

        this.wsp.onClose.addListener(data => {
            console.log('connection closed! code:' + data.code);
            window.socketConnection = false;
        });

        return this.wsp.open()
            .then(() => {
                console.log("Connection established!");
                window.socketConnection = true;//TODO remove

                return Promise.resolve();
            })
            .catch(e => {
                    console.log("ws connection error!");
                    return Promise.reject(e);
                }
            );


    }



    sendRequest(data) {//waits for response with id

        return new Promise((resolve, reject) => {
            if (!this.wsp) return reject('No socket connection.');

            return this.wsp.sendRequest(data)
                .then(response => {
                    console.log(response);
                    return resolve(response);
                })
                .catch(e => {//fghhj
                    console.log('response error');
                    console.log(e);
                    return reject(e);
                });


        });
    }

    send(data){//send and forget

        return new Promise((resolve, reject) => {
            if (!this.wsp) return reject('No socket connection.');
            this.wsp.sendPacked(data);

            return resolve();
        });

    }


// disconnect() {
    //     return new Promise((resolve) => {
    //         this.socket.disconnect(() => {
    //             this.socket = null;
    //             resolve();
    //         });
    //     });
    // }

    // on(event, fun) {
    //     // No promise is needed here, but we're expecting one in the middleware.
    //     return new Promise((resolve, reject) => {
    //         if (!this.socket) return reject('No socket connection.');
    //
    //         this.socket.on(event, fun);
    //         resolve();
    //     });
    // }
}