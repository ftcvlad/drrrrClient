import * as types from "./actionTypes";
import {CREATE_GAME_SUCCEED, PLAY_GAME_SUCCEED} from "./actionTypes";

export function createGameSucceed(data){
    return {type: types.CREATE_GAME_SUCCEED, game: data };
}

export function playGameSucceed(data){
    return {type: types.PLAY_GAME_SUCCEED, game: data };
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

export function playGame(data){
    return {
        type:"API_CALL",
        successActionCreator: playGameSucceed,
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

export function recreateGameList(games){
    return {type: types.RECREATE_GAME_LIST, games: games };
}

export function userPickSucceed(game){
    return {type: types.USER_PICK_SUCCEED, game: game };
}