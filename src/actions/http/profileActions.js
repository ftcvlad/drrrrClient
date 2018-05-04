import {USER_UPDATE_SUCCESS } from "./actionTypes";
import {API_ROOT} from '../../api-config';

export function httpGetSavedGameList(userId){
    return {
        type: "API_CALL",
        request: {
            url: API_ROOT+'games/saved/'+userId,
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
            url: API_ROOT+'games',
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
            url: API_ROOT+'user/'+userId,
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



export function httpGetEtudeList(){
    return {
        type: "API_CALL",
        request: {
            url: API_ROOT+'etudes',
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



