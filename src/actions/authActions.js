import * as types from './actionTypes';




function loginFinished(data){
  return {type: types.ATTEMPT_LOGIN_SUCCESS, user:data };
}

function logoutFinished(){
    return {type: types.ATTEMPT_LOGOUT_SUCCESS, user:{} };
}

export function attemptLogout() {
    return dispatch => {
        return fetch("http://localhost:8080/logout", {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    dispatch(logoutFinished());
                    Promise.resolve();
                }
                else {
                    throw "error!";
                }
            })

    };
}


export function attemptRegister(data) {
    return dispatch => {
        return fetch("http://localhost:8080/register", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => dispatch(loginFinished(data)));
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

            })

    };
}


export function attemptLogin(data) {
  return dispatch => {
    return fetch("http://localhost:8080/login", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => dispatch(loginFinished(data)));
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

    })

  };
}


// export function fetchStuff() {
//     return dispatch => {
//         return fetch("localhost:8080/login", {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Accept': 'application/json'
//             }
//         })
//             .then(response => {console.log(response); return response.json()})
//             .then(json => dispatch(receiveStuff(json)));
//     };
// }