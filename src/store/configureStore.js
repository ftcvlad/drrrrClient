import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {getUser} from '../actions/userActions';
import fetchMiddleware from '../middleware/fetchMiddleware';

export default function configureStore() {
  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({'name':'bebe'}),
    applyMiddleware(thunk, fetchMiddleware)

  );

    return fetchInitialState(store);
}



function fetchInitialState(store){//.catch(()=>console.log("failed fetching user"));??
    return store.dispatch(getUser())
        .then(() => {
            return store;
        });
}

