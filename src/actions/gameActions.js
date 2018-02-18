import * as types from "./actionTypes";

function createGameSucceed(data){
    return {type: types.CREATE_GAME_SUCCEED, game: data };
}


export function createGame(options){
    return {
        type:"API_CALL",
        successActionCreator: createGameSucceed,
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


function removeAllGamesSucceed(){
    return {type: types.REMOVE_ALL_GAMES_SUCCEED, game: {} };
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

export function updateGameList(games){
    return {type: types.UPDATE_GAME_LIST, games: games };
}
