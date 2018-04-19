

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

export function BroadcastParticipantsChangedToTableSuccess(gameInfo){
    return {type: types.BROADCAST_PARTICIPANTS_CHANGED_to_table_SUCCEED, gameInfo: gameInfo };
}

export function BroadcastParticipantsChangedToTablesSuccess(gameInfo){
    return {type: types.BROADCAST_PARTICIPANTS_CHANGED_to_tables_SUCCEED, gameInfo: gameInfo };
}

export function broadcastGameStartedSuccess(gameState){
    return {type: types.BROADCAST_GAME_STARTED_SUCCEED, gameState: gameState};
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

//game move ins move outs
export function exitGameSuccess(){
    return {type: types.EXIT_GAME_SUCCEED};
}

export function broadcastTableRemovedSuccess(gameId){
    return {type: types.BROADCAST_TABLE_REMOVED_SUCCEED, gameId: gameId};
}

//finish events
export function broadcastGameFinishedSuccess(gameResult){
    return {type: types.BROADCAST_GAME_FINISHED_SUCCEED, gameResult: gameResult};
}


