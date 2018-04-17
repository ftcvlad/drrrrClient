import * as types from "./actionTypes";


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


//remove all games
function removeAllGamesSucceed(){
    return {type: types.REMOVE_ALL_GAMES_SUCCEED, game: {} };
}



