import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function chatMessagesReducer(state = initialState.currentGame.chatMessages, action) {

    let newState;
    switch (action.type) {

        case types.JOIN_ROOM_PLAY_SUCCEED:
            return action.currentGame.chatMessages.slice();
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return [];
        case types.RECEIVE_CHAT_MESSAGE:
            newState = state.slice();
            newState.push(action.msg);
            return newState;
        case types.EXIT_GAME_SUCCEED:
            return [];
        default:
            return state;
    }
}