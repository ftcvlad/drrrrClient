
export function logout(){
    return {
        resource: 'user',
        method: 'delete',
        request: (data)=>({
            url: 'http://localhost:8080/session',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        })
    };
}

export function register(){
    return {
        resource: {name:'user', action: 'registerUser'},
        method: 'post',
        request: (data)=>({
            url: 'http://localhost:8080/users',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        })
    };
}


export function login(){
    return {
        resource: 'user',
        method: 'post',
        request: (data)=>({
            url: 'http://localhost:8080/session',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
            mode: 'cors',
            credentials: 'include'
        })
    };
}


