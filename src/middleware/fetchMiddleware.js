
const customFetchMiddleware = store => next => action => {

    if (action.type === "API_CALL"){
        console.log(action);
        let requestObj = {
            method: action.request.method,
            mode: action.request.mode,
            credentials: action.request.credentials
        };


        if (action.request.body){
            requestObj.body = action.request.body;
        }
        if (action.request.headers){
            requestObj.headers = action.request.headers;
        }

        return fetch(action.request.url,requestObj )
            .then(response => {
                if (response.ok) {

                    if (action.successActionCreator){
                        if (response.status === 204){//no content
                            store.dispatch(action.successActionCreator());
                        }
                        else{
                            return response.json().then(data => store.dispatch(action.successActionCreator(data)));
                        }
                    }
                    else if (response.status === 200){
                        return response.json();
                    }
                }
                else if (response.status === 401) {//validation error or unauthorised
                    return response.json().then(data => {
                        throw data.message;
                    });
                }
                else if (response.status === 403) {//authorised, but doesn't have permission for access
                    return response.json().then(data => {
                        console.log(data);
                        throw data.message;
                    });
                }
                else if (response.status === 404){//not found

                }
                return Promise.resolve();

            });
        // .catch(e=>{
        //     console.log('catch');
        //     console.log(e);
        // });


    }

    return next(action);
};

export default customFetchMiddleware;