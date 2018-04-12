import * as types from "./actionTypes";

export function receiveChatMessage(msg, gameId){
    return {type: types.RECEIVE_CHAT_MESSAGE, msg: msg, gameId: gameId };
}