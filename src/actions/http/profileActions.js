import {GET_SAVED_GAMES_SUCCESS} from "./actionTypes";
import {SEND, SEND_FAIL, SEND_SUCCESS} from "../actionTypes";
import {messageTypes} from "../messageTypes";

export function httpGetSavedGameList(userId){
    return {
        type: "API_CALL",
        request: {
            url: 'http://localhost:8080/games/saved/'+userId,
            method: 'get',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}


export function httpSaveGame(data){
    return {
        type: "API_CALL",
        request: {
            url: 'http://localhost:8080/games',
            method: 'put',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body:JSON.stringify(data),
        }
    };
}
