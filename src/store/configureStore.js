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
    return fetchInitialState(store);


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