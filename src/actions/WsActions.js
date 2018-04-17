import {SEND, SEND_SUCCESS, SEND_FAIL} from './actionTypes';
import {messageTypes} from "../functions/WebSocketStuff";



export function wsSendJoinRoomTables(roomCategory) {

    let msg = {
        msgType: messageTypes.JOIN_ROOM_TABLES,
        roomCategory: roomCategory
    };
    const message = JSON.stringify(msg);
    return {
        type: 'socket',
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.send(message)
    }
}


export function wsConnect() {
    return {
        type: 'socket',
        types: [SEND, SEND_SUCCESS, SEND_FAIL],
        promise: (socket) => socket.connect()
    }
}