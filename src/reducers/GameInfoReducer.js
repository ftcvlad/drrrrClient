import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function gameInfoReducer(state = initialState.currentGame.gameInfo, action) {

    let newState;
    switch (action.type) {



        case types.JOIN_GAME_SUCCEED:
        case types.CREATE_GAME_SUCCEED:
        case types.JOIN_ROOM_PLAY_SUCCEED:
           return Object.assign({}, action.currentGame.gameInfo);
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return {};
        case types.BROADCAST_PARTICIPANTS_CHANGED_to_table_SUCCEED:
        case types.CONFIRM_PLAYING_SUCCEED:
        case types.SUGGEST_DRAW_SUCCEED:
        case types.RESPOND_DRAW_OFFER_SUCCEED:
        case types.SURRENDER_SUCCEED:
        case types.CANCEL_DRAW_OFFER_SUCCEED:
        case types.DROP_OPPONENT_SUCCEED:
            return Object.assign({}, action.gameInfo);
        case types.EXIT_GAME_SUCCEED:
            return {};



        default:
            return state;
    }
}