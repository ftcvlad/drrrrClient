import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer.js';
import gamesReducer from './gamesReducer';


const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    games: gamesReducer

});

export default rootReducer;



