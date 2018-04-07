import initialState from './initialState';
import {CREATE_GAME_SUCCEED, PLAY_GAME_SUCCEED, REMOVE_ALL_GAMES_SUCCEED, UPDATE_GAME_LIST} from '../actions/actionTypes';

export default function gamesReducer(state = initialState.games, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!

    let newState;
    switch (action.type) {

        case CREATE_GAME_SUCCEED:
            newState = state.slice();
            newState.push(action.game);
            return newState;
        case PLAY_GAME_SUCCEED://games are updated by this and by joining room, but no rerender anyway
            newState = state.slice();
            let gameIndex = newState.findIndex((game => game.id === action.game.id));
            newState[gameIndex] = action.game;
            return newState;
        case REMOVE_ALL_GAMES_SUCCEED:
            return [];
        case UPDATE_GAME_LIST:
            newState = state.concat(action.games);//TODO if join play64, remove unneeded games?
            //remove duplicates
            newState = newState.filter((elem, index, self) =>
                index === self.findIndex((el) => (
                    el.gameId === elem.gameId
                ))
            );
            return newState;


        default:
            return state;
    }
}