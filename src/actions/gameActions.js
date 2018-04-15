import * as types from "./actionTypes";

export function createGame(options){
    return {
        type:"API_CALL",
        successActionCreator: createGameSuccess,//state is also updated when joined room, but this is half sec faster
        request: {
            method: 'post',
            url: 'http://localhost:8080/games',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options),
            mode: 'cors',
            credentials: 'include'
        }
    };
}

export function playGame(data){
    return {
        type:"API_CALL",
        successActionCreator: joinGameSucceed,//state is also updated when joined room, but this is half sec faster
        request: {
            method: 'put',
            url: 'http://localhost:8080/games/'+data.gameId+'/play',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        }
    };
}

export function watchGame(data){
    return {
        type:"API_CALL",
        successActionCreator: joinGameSucceed,//state is also updated when joined room, but this is half sec faster
        request: {
            method: 'put',
            url: 'http://localhost:8080/games/'+data.gameId+'/watch',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        }
    };
}





export function removeAllGames(){
    return {
        type:"API_CALL",
        successActionCreator: removeAllGamesSucceed,
        request: {
            method: 'delete',
            url: 'http://localhost:8080/games',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}


//---- proper :/

//join room
export function joinRoomPlaySuccess(currentGame){
    return {type: types.JOIN_ROOM_PLAY_SUCCEED, currentGame: currentGame };
}
export function joinRoomTablesSuccess(gameList){
    return {type: types.JOIN_ROOM_TABLES_SUCCEED, gameList: gameList };
}

//create
export function createGameSuccess(currentGame){
    return {type: types.CREATE_GAME_SUCCEED, currentGame:currentGame };
}
export function broadcastGameCreatedSuccess(gameInfo){
    return {type: types.BROADCAST_CREATE_GAME_SUCCEED, gameInfo:gameInfo };
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

//remove all games
function removeAllGamesSucceed(){
    return {type: types.REMOVE_ALL_GAMES_SUCCEED, game: {} };
}
//sdfdsfgf/as/asdasdassd
//moves
export function userPickSucceed(currentGame){
    return {type: types.USER_PICK_SUCCEED, currentGame: currentGame };
}

export function userMoveSucceed(currentGame){
    return {type: types.USER_MOVE_SUCCEED, currentGame: currentGame };
}