export default function socketMiddleware(socket) {

    //const customFetchMiddleware = store => next => action => {

    // Socket param is the client. We'll show how to set this up later.
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
console.log("WS MIDDLEWARE");
        /*
         * Socket middleware usage.
         * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
         * type: always 'socket'
         * types: [REQUEST, SUCCESS, FAILURE]
         */
        const { promise, type, types } = action;

        if (type !== 'socket' || !promise) {
            // Move on! Not a socket request or a badly formed one.
            return next(action);
        }

        const [SEND, SEND_SUCCESS, SEND_FAIL] = types;
        next({type: SEND});


        return promise(socket)
            .then((result) => {

                next({ result, type: SEND_SUCCESS });



                return result;

            })
            .catch((error) => {
                next({ error, type: SEND_FAIL });
                throw error;
            });
    };
}

