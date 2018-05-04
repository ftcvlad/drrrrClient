
import {ATTEMPT_LOGIN_SUCCESS, ATTEMPT_LOGOUT_SUCCESS, ATTEMPT_REGISTER_SUCCESS} from "./actionTypes";
import {API_ROOT} from '../api-config';

function loginSucceed(data){
    return {type: ATTEMPT_LOGIN_SUCCESS, user:data };
}

function registerSucceed(data){
    return {type: ATTEMPT_REGISTER_SUCCESS, user:data };
}

function logoutSucceed(){
    return {type: ATTEMPT_LOGOUT_SUCCESS, user:{} };
}


export function logout(){
    return {
        type: "API_CALL",
        successActionCreator: logoutSucceed,
        request: {
            url: API_ROOT+'session',
            method: 'delete',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}

export function register(data){
    return {
        type:"API_CALL",
        successActionCreator: registerSucceed,
        request: {
            method: 'post',
            url: API_ROOT+'users',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        }
    };
}


export function login(data){
    return {
        type:"API_CALL",
        successActionCreator: loginSucceed,
        request: {
            method: 'post',
            url: API_ROOT+'session',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        }
    };
}


