import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './userReducer.js';
import gameInfoReducer from './gameInfoReducer';
import gameStateReducer from './gameStateReducer';
import gameListReducer from './gameListReducer';
import chatMessagesReducer from './ChatMessagesReducer';
import gameResultReducer from './GameResultReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    gameList: gameListReducer,
    currentGame: combineReducers({
        gameInfo: gameInfoReducer,
        gameState: gameStateReducer,
        chatMessages: chatMessagesReducer,
        gameResult: gameResultReducer
    })

});

export default rootReducer;



