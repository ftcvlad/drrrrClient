import history from '../history';

export default function socketMiddleware(socket) {

    //const customFetchMiddleware = store => next => action => {

    // Socket param is the client. We'll show how to set this up later.
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, type, types } = action;

        if (type !== 'socket' || !promise) {
            // Move on! Not a socket request or a badly formed one.
            return next(action);
        }

        const [SEND, SEND_SUCCESS, SEND_FAIL] = types;
        //next({type: SEND});


        return promise(socket, dispatch)
            .then((result) => {

                //next({ result, type: SEND_SUCCESS });//generic success

                if (result){

                    if (result.status === 200 || result.status === 204){

                        if (action.successActionCreator){
                            if (result.status === 200){
                                dispatch(action.successActionCreator(result.data));
                            }
                            else if (result.status === 204){
                                dispatch(action.successActionCreator());
                            }
                        }

                        return result;
                    }
                    else if (result.status === 401){
                        history.push('/');//unauthorised
                    }
                    else if (result.status === 403){
                        history.push('/tables64');//not in game
                    }

                }
                return Promise.resolve();



            })
            .catch((error) => {
                //next({ error, type: SEND_FAIL });
                throw error;
            });
    };
}

