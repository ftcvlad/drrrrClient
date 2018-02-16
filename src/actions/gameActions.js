import {GET_CURRENT_USER_SUCCESS, CREATE_GAME_SUCCEED} from "./actionTypes";

function createGameSucceed(data){
    return {type: CREATE_GAME_SUCCEED, game: data };
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