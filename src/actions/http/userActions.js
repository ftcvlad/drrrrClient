import { GET_CURRENT_USER_SUCCESS}  from '../actionTypes';

function getAuthedUserSucceed(data){
    return {type: GET_CURRENT_USER_SUCCESS, user:data };
}


export function getAuthedUser(){
    return {
        type:"API_CALL",
        successActionCreator: getAuthedUserSucceed,
        request: {
            method: 'get',
            url: 'http://localhost:8080/user/current',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}


export function httpGetUser(id){
    return {
        type:"API_CALL",
        request: {
            method: 'get',
            url: 'http://localhost:8080/user/'+id,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}