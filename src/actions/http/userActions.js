import { GET_CURRENT_USER_SUCCESS}  from '../actionTypes';
import {API_ROOT} from '../../api-config';

function getAuthedUserSucceed(data){
    return {type: GET_CURRENT_USER_SUCCESS, user:data };
}


export function getAuthedUser(){
    return {
        type:"API_CALL",
        successActionCreator: getAuthedUserSucceed,
        request: {
            method: 'get',
            url: API_ROOT+'user/current',
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
            url: API_ROOT+'user/'+id,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        }
    };
}