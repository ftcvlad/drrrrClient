import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameInfoReducer(state = initialState.currentGame.gameState, action) {

    let newState;
    switch (action.type) {

        case types.table_BROADCAST_PLAYER_JOINED_SUCCEED:
        case types.JOIN_GAME_SUCCEED:
        case types.CREATE_GAME_SUCCEED:
        case types.JOIN_ROOM_PLAY_SUCCEED:
            return Object.assign({}, action.currentGame.gameState);
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return {};
        case types.USER_PICK_SUCCEED:
        case types.USER_MOVE_SUCCEED:
            return Object.assign({}, action.gameState);



        default:
            return state;
    }
}