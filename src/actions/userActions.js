import { GET_CURRENT_USER_SUCCESS}  from './actionTypes';

function getUserSucceed(data){
    console.log(data);

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
                console.log('--3');
                if (response.ok) {
                    response.json().then(data => dispatch(getUserSucceed(data)));
                    Promise.resolve();
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
                    Promise.resolve();//user not found
                }

            })
            .catch(e=>{
                console.log('catch');
                console.log(e);
            })

    };
}