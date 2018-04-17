import {SEND, SEND_SUCCESS, SEND_FAIL} from './actionTypes';
import {messageTypes} from "./messageTypes";

import {createGameSuccess,
    joinRoomTablesSuccess,
    joinRoomPlaySuccess,
    joinGameSucceed,
    userPickSucceed,
    userMoveSucceed,
    receiveChatMessage} from './WsReceiveActions';






export function wsSendJoinRoomTables(roomCategory) {

    let msg = {
        msgType: messageTypes.JOIN_ROOM_TABLES,
        roomCategory: roomCategory
    };

    return {
        type: 'socket',
        successActionCreator: joinRoomTablesSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }
}


export function wsSendJoinRoomPlay() {

    let msg = {
        msgType: messageTypes.JOIN_ROOM_PLAY
    };

    return {
        type: 'socket',
        successActionCreator: joinRoomPlaySuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }
}



export function wsSendPlayGame(gameId) {

    let msg = {
        msgType: messageTypes.PLAY_GAME,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: joinGameSucceed,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }
}

export function wsSendWatchGame(gameId) {

    let msg = {
        msgType: messageTypes.WATCH_GAME,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: joinGameSucceed,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }
}

export function wsSendCreateGame(options){
    let msg = {
        msgType: messageTypes.CREATE_GAME,
        options: options,
    };

    return {
        type: 'socket',
        successActionCreator: createGameSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }

}

export function wsSendUserPick(moveInfo, gameId){
    let msg = {
        msgType: messageTypes.USER_PICK,
        moveInfo: moveInfo,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: userPickSucceed,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }

}

export function wsSendUserMove(moveInfo, gameId){
    let msg = {
        msgType: messageTypes.USER_MOVE,
        moveInfo: moveInfo,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: userMoveSucceed,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    }

}


export function wsSendChatMessageSend(msgObj, gameId){

    let msg = {
        msgType: messageTypes.SEND_CHAT_MESSAGE,
        msgObj: msgObj,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: receiveChatMessage,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };


}



export function wsConnect() {
    return {
        type: 'socket',
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket, dispatch) => socket.connect(dispatch)
    }
}