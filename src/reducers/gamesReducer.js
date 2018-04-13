import initialState from './initialState';
import {CREATE_GAME_SUCCEED, PLAY_GAME_SUCCEED, REMOVE_ALL_GAMES_SUCCEED, USER_PICK_SUCCEED,RECREATE_GAME_LIST,USER_MOVE_SUCCEED, RECEIVE_CHAT_MESSAGE  } from '../actions/actionTypes';

export default function gamesReducer(state = initialState.games, action) {
    //state is array? o_o -- user is a namespace, but the state for this reducer is []!

    let newState;
    switch (action.type) {

        case CREATE_GAME_SUCCEED:
            newState = state.slice();
            newState.push(action.game);
            return newState;
        case PLAY_GAME_SUCCEED://games are updated by this and by joining room, but no rerender anyway
        case USER_PICK_SUCCEED:
        case USER_MOVE_SUCCEED:
            newState = state.slice();
            let gameIndex = newState.findIndex((game => game.id === action.game.id));
            newState[gameIndex] = action.game;
            return newState;
        case REMOVE_ALL_GAMES_SUCCEED:
            return [];
        //TODO make smaller reducers to get specific part of state (e.g. chatMesages)
        //TODO split game into table:{game, chatMessages}. Then separate reducer for game and ChatMessages
        case RECEIVE_CHAT_MESSAGE:
            newState = state.slice();
            newState.find(function(game, index) {
                if (game.gameId === action.gameId) {
                    let updatedChatMessages =  game.chatMessages.slice();
                    updatedChatMessages.push(action.msg);
                    game.chatMessages =updatedChatMessages;
                }
            });
            return newState;

        case RECREATE_GAME_LIST:
            console.log(action);
            return action.games;
            //return newState;
            // newState = state.concat(action.games);//TODO if join play64, remove unneeded games?
            // //remove duplicates
            // newState = newState.filter((elem, index, self) =>
            //     index === self.findIndex((el) => (
            //         el.gameId === elem.gameId
            //     ))
            // );
            // return newState;


        default:
            return state;
    }
}