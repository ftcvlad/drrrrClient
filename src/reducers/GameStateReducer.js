import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameInfoReducer(state = initialState.currentGame.gameState, action) {

    let newState;
    switch (action.type) {

        case types.JOIN_GAME_SUCCEED:
        case types.CREATE_GAME_SUCCEED:
        case types.JOIN_ROOM_PLAY_SUCCEED:
            return Object.assign({}, action.currentGame.gameState);
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return {};
        case types.USER_PICK_SUCCEED:
        case types.USER_MOVE_SUCCEED:
        case types.BROADCAST_GAME_STARTED_SUCCEED:
        case types.UPDATE_TIME_LEFT_SUCCEED:
            return Object.assign({}, action.gameState);
        case types.EXIT_GAME_SUCCEED:
            return {};
        case types.BROADCAST_GAME_FINISHED_SUCCEED:
            newState = Object.assign({}, state);
            newState.isGameGoing = false;
            return newState;



        default:
            return state;
    }
}