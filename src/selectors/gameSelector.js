import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGameInfo = (state) => { return state.gameList;};



export const getCurrentGameInfo = (state) => {return state.currentGame.gameInfo};
export const getCurrentGameState = (state) => {return state.currentGame.gameState};
export const getCurrentGameChatMessages = (state) => {return state.currentGame.chatMessages};
export const getCurrentGameResult = (state) => {return state.currentGame.gameResult};

export const getCurrentGameId = (state) => {return state.currentGame.gameInfo.gameId};


// export const isUserWatching = createSelector(
//     [ getUser, getCurrentGameInfo],
//     (user, gameInfo) => {
//
//         for (let i=0; i<gameInfo.watchers.length; i++){
//             if (user.id === gameInfo.watchers[i].id){
//                 return true;
//             }
//         }
//         return false;
//
//     }
// );



export const getOwnPlayerObject = createSelector(
    [ getUser, getCurrentGameInfo, (_, props) => props.forOpponent, ],
    (user, gameInfo, forOpponent) => {


        if (Object.keys(gameInfo).length === 0){//asdasdsad
            return {};
        }

        if (gameInfo.players.length === 0){
            return {};
        }
        else if (gameInfo.players.length === 1){
            return forOpponent ? {} : gameInfo.players[0];
        }
        else if (gameInfo.players.length === 2){
            if (gameInfo.players[0].id === user.id){
                return forOpponent ? gameInfo.players[1] : gameInfo.players[0];
            }
            else if (gameInfo.players[1].id === user.id){
                return forOpponent ? gameInfo.players[0] : gameInfo.players[1];
            }
            else{//if im watcher return as for white player
                return forOpponent ? gameInfo.players[1] : gameInfo.players[0];
            }
        }

        return {};
    }
);





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