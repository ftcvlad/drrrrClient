import {SEND, SEND_SUCCESS, SEND_FAIL} from './actionTypes';
import {messageTypes} from "./messageTypes";

import {createGameSuccess,
    joinRoomTablesSuccess,
    joinRoomPlaySuccess,
    joinGameSucceed,
    userPickSucceed,
    userMoveSucceed,
    receiveChatMessage,
    exitGameSuccess,
    surrenderSuccess,
    confirmPlayingSuccess,
    suggestDrawSuccess,
    respondDrawOfferSuccess,
    cancelDrawOfferSuccess} from './WsReceiveActions';






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


//above works :)



export function wsSendExitGame(gameId){
    let msg = {
        msgType: messageTypes.EXIT_GAME,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: exitGameSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}

export function wsSendConfirmPlaying(gameId){
    let msg = {
        msgType: messageTypes.CONFIRM_PLAYING,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: confirmPlayingSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}


export function wsSendSurrender(gameId){
    let msg = {
        msgType: messageTypes.SURRENDER,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: surrenderSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}

export function wsSendSuggestDraw(gameId){
    let msg = {
        msgType: messageTypes.SUGGEST_DRAW,
        gameId: gameId
    };

    return {
        type: 'socket',
        successActionCreator: suggestDrawSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}

export function wsSendRespondDrawOffer(gameId, decision) {
    let msg = {
        msgType: messageTypes.RESPOND_DRAW_OFFER,
        gameId: gameId,
        decision: decision
    };

    return {
        type: 'socket',
        successActionCreator: respondDrawOfferSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}


export function wsSendCancelDrawOffer(gameId) {
    let msg = {
        msgType: messageTypes.CANCEL_DRAW_OFFER,
        gameId: gameId

    };

    return {
        type: 'socket',
        successActionCreator: cancelDrawOfferSuccess,
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}

export function wsSendTimeIsUp(gameId) {
    let msg = {
        msgType: messageTypes.TIME_IS_UP,
        gameId: gameId
    };

    return {
        type: 'socket',
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.sendRequest(msg)
    };
}
