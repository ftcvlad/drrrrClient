import { GET_CURRENT_USER_SUCCESS}  from './actionTypes';

function getUserSucceed(data){
    return {type: GET_CURRENT_USER_SUCCESS, user:data };
}


export function getUser(){
    return {
        type:"API_CALL",
        successActionCreator: getUserSucceed,
        request: {
            method: 'get',
            url: 'http://localhost:8080/user',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}