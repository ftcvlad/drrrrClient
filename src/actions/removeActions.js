import * as types from "./actionTypes";
import {API_ROOT} from '../api-config';

export function removeAllGames(){
    return {
        type:"API_CALL",
        successActionCreator: removeAllGamesSucceed,
        request: {
            method: 'delete',
            url: API_ROOT+'games',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}


//remove all games
function removeAllGamesSucceed(){
    return {type: types.REMOVE_ALL_GAMES_SUCCEED, game: {} };
}



