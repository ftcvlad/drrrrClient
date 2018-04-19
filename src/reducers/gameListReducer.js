import initialState from "./initialState";
import * as types from '../actions/actionTypes';

export default function gameListReducer(state = initialState.gameList, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!

    let newState;
    switch (action.type) {

        case types.JOIN_ROOM_TABLES_SUCCEED:
            return action.gameList.slice();
        case types.BROADCAST_CREATE_GAME_SUCCEED:
            newState = state.slice();
            newState.push(action.gameInfo);
            return newState;
        case types.BROADCAST_PARTICIPANTS_CHANGED_to_tables_SUCCEED:
            newState = state.slice();
            newState.find(function(gameInfo, index) {
                if (gameInfo.gameId === action.gameInfo.gameId) {
                    newState[index] = Object.assign({},action.gameInfo );
                    return newState;
                }
            });
            return newState;
        case types.REMOVE_ALL_GAMES_SUCCEED:
            return [];
        case types.BROADCAST_TABLE_REMOVED_SUCCEED:
            newState = state.slice();

            newState = newState.filter(function( gameInfo ) {
                return gameInfo.gameId !==  action.gameId;
            });
            return newState;


        default:
            return state;
    }
}