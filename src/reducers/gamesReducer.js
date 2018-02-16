import initialState from './initialState';
import {CREATE_GAME_SUCCEED} from '../actions/actionTypes';

export default function gamesReducer(state = initialState.games, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!
    console.log(action);
    console.log(state);
    console.log(state.slice());
    switch (action.type) {

        case CREATE_GAME_SUCCEED:
            let newState = state.slice();
            newState.push(action.game);
            return newState;


        default:
            return state;
    }
}////fdsfgfgdfgdfg