import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {getUser} from '../actions/userActions';

export default function configureStore() {
  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );

    console.log("fetching initial state...");
    fetchInitialState(store);

    return store;
}

function fetchInitialState(store){
    store.dispatch(getUser());
        //.catch(()=>console.log("failed fetching user"));
}

// export default function configureStore() {
//     return createStore(
//         rootReducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//         applyMiddleware(thunk)
//     );
// }