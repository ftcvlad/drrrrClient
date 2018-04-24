import {GET_SAVED_GAMES_SUCCESS} from "./actionTypes";

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

