import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGameInfo = (state) => { return state.gameList;};



export const getCurrentGameInfo = (state) => {return state.currentGame.gameInfo};
export const getCurrentGameState = (state) => {return state.currentGame.gameState};
export const getCurrentGameChatMessages = (state) => {return state.currentGame.chatMessages};
export const getCurrentGameResult = (state) => {return state.currentGame.gameResult};

export const getCurrentGameId = (state) => {return state.currentGame.gameInfo.gameId};


// export const getChatMessages = (state) => {
//     if (state.currentGame === null){
//         return [];
//     }
//     return state.currentGame.chatMessages;
// };

// export const getChatMessages = createSelector(
//     [ getUser, getAllGameInfo ],
//     (user, allGames) => {
//         let playerIds = [];
//         let watcherIds = [];
//         for (let i=0; i<allGames.length; i++) {
//             playerIds = allGames[i].players.map(p=>p.id);
//             watcherIds = allGames[i].watchers.map(w=>w.id);
//             if (playerIds.indexOf(user.id)>-1 || watcherIds.indexOf(user.id)>-1){
//                 return allGames[i].chatMessages;
//             }
//         }
//
//         return [];
//     }
// );