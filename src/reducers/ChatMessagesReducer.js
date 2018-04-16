import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameInfoReducer(state = initialState.currentGame.chatMessages, action) {

    let newState;
    switch (action.type) {

        case types.JOIN_ROOM_PLAY_SUCCEED:
            return action.currentGame.chatMessages.slice();
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return [];

        default:
            return state;
    }
}