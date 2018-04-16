import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function currentGameReducer(state = initialState.currentGame, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!

    let newState;
    switch (action.type) {



        //TODO make smaller reducers to get specific part of state (e.g. chatMesages)
        //TODO split game into table:{game, chatMessages}. Then separate reducer for game and ChatMessages
        case types.RECEIVE_CHAT_MESSAGE:
            newState = Object.assign({}, state);
            let updatedArr = state.chatMessages.slice();
            updatedArr.push(action.msg);
            newState.chatMessages = updatedArr;

            return newState;







        default:
            return state;
    }
}