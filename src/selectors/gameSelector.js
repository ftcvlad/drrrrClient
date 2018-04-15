import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGameInfo = (state) => { return state.gameList;};
export const getCurrentGame = (state) => {return state.currentGame};

export const getChatMessages = (state) => {
    if (state.currentGame === null){
        return [];
    }
    return state.currentGame.chatMessages;
};

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