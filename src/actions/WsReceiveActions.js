

import * as types from "./actionTypes";


//create
export function createGameSuccess(currentGame){
    return {type: types.CREATE_GAME_SUCCEED, currentGame:currentGame };
}
export function broadcastGameCreatedSuccess(gameInfo){
    return {type: types.BROADCAST_CREATE_GAME_SUCCEED, gameInfo:gameInfo };
}

//join room
export function joinRoomPlaySuccess(currentGame){
    return {type: types.JOIN_ROOM_PLAY_SUCCEED, currentGame: currentGame };
}
export function joinRoomTablesSuccess(gameList){
    return {type: types.JOIN_ROOM_TABLES_SUCCEED, gameList: gameList };
}

//play and watch
export function joinGameSucceed(currentGame){
    return {type: types.JOIN_GAME_SUCCEED, currentGame: currentGame };
}

export function tables_BroadcastPlayerJoinedSuccess(gameInfo){
    return {type: types.tables_BROADCAST_PLAYER_JOINED_SUCCEED, gameInfo: gameInfo };
}

export function table_BroadcastPlayerJoinedSuccess(currentGame){
    return {type: types.table_BROADCAST_PLAYER_JOINED_SUCCEED, currentGame: currentGame };
}

//moves
export function userPickSucceed(gameState){
    return {type: types.USER_PICK_SUCCEED, gameState: gameState };
}

export function userMoveSucceed(gameState){
    return {type: types.USER_MOVE_SUCCEED, gameState: gameState };
}

//chat
export function receiveChatMessage(data){
    return {type: types.RECEIVE_CHAT_MESSAGE, msg: data.msg, gameId: data.gameId };
}