import { GET_CURRENT_USER_SUCCESS}  from './actionTypes';

function getUserSucceed(data){
    return {type: GET_CURRENT_USER_SUCCESS, user:data };
}



export function getUser() {
    return dispatch => {

        return fetch("http://localhost:8080/user", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {

                if (response.ok) {
                    return response.json().then(data => dispatch(getUserSucceed(data)));
                }
                else if (response.status === 422) {
                    throw "error!";
                }
                else if (response.status === 401) {
                    return response.json().then(data => {
                        throw data.msg;
                    });
                }
                else if (response.status === 404){

                }
                //return Promise.resolve();

            })
            .catch(e=>{
                console.log('catch');
                console.log(e);
            })

    };
}