import * as types from "./actionTypes";

export function receiveChatMessage(data){
    return {type: types.RECEIVE_CHAT_MESSAGE, msg: data.msg, gameId: data.gameId };
}