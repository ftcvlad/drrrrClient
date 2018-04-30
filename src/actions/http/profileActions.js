import {USER_UPDATE_SUCCESS } from "./actionTypes";


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


export function httpUpdateUserProfile(data, userId){
    return {
        type: "API_CALL",
        successActionCreator: userUpdateSucceed,
        request: {
            url: 'http://localhost:8080/user/'+userId,
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

function userUpdateSucceed(data){
    return {type: USER_UPDATE_SUCCESS, user:data };
}