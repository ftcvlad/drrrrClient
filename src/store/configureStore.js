import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {getUser} from '../actions/userActions';
import {middleware as fetchMiddleware} from 'react-redux-fetch';

export default function configureStore() {
  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, fetchMiddleware)

  );

    console.log("fetching initial state...");
    //return fetchInitialState(store);

    return Promise.resolve(store);
}




function fetchInitialState(store){//.catch(()=>console.log("failed fetching user"));??
    return store.dispatch(getUser())
        .then(() => {
            return store;
        });



}

// export default function configureStore() {
//     return createStore(
//         rootReducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//         applyMiddleware(thunk)
//     );
// }