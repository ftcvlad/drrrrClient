import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer.js';
import currentGameReducer from './currentGameReducer';
import gameListReducer from './gameListReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    gameList: gameListReducer,
    currentGame: currentGameReducer

});

export default rootReducer;



