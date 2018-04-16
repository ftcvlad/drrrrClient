import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function currentGameReducer(state = initialState.currentGame, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!

    let newState;
    switch (action.type) {



        //TODO make smaller reducers to get specific part of state (e.g. chatMesages)
        //TODO split game into table:{game, chatMessages}. Then separate reducer for game and ChatMessages








        default:
            return state;
    }
}