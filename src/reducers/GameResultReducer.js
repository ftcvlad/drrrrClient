import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameResultReducer(state = initialState.currentGame.gameResult, action) {

    let newState;
    switch (action.type) {

        case types.SURRENDER_SUCCEED:
        case types.BROADCAST_GAME_FINISHED_SUCCEED:
            return action.gameResult.slice();
        case types.BROADCAST_GAME_STARTED_SUCCEED:
        case types.JOIN_ROOM_PLAY_SUCCEED:
            return [];


        default:
            return state;
    }
}