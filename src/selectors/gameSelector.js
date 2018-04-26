import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGameInfo = (state) => { return state.gameList;};



export const getCurrentGameInfo = (state) => {return state.currentGame.gameInfo};
export const getCurrentGameState = (state) => {return state.currentGame.gameState};
export const getCurrentGameChatMessages = (state) => {return state.currentGame.chatMessages};
export const getCurrentGameResult = (state) => {return state.currentGame.gameResult};

export const getCurrentGameId = (state) => {return state.currentGame.gameInfo.gameId};



export const getIsGameGoing = (state) => {
    if (!state.currentGame.gameState.isGameGoing ){//false or undefined
        return false;
    }
    return true;

};

export const getMovingPlayerId = createSelector(
    [ getCurrentGameInfo, getCurrentGameState],
    (gameInfo, gameState) => {

        if (!gameState.isGameGoing){
            return null;
        }
        if (!gameInfo.players[gameState.currentPlayer]){//TODO gameState.currentPlayer 1, but player exit, palyers[1] === undefined, and gameFinished broadcasted separately a bit later. broadcast gameExit instead!
            return null;
        }
        return gameInfo.players[gameState.currentPlayer].id;

    }
);


export const getTimeLeft = createSelector(
    [ getCurrentGameInfo, getCurrentGameState, (_, props) => props.whiteSide],
    (gameInfo, gameState, whiteSide) => {

        if (whiteSide === null){
            return gameInfo.timeReserve;
        }
        else{
            return whiteSide === true ? gameState.timeLeft[0] : gameState.timeLeft[1];
        }


    }
);







export const getOwnPlayerObject = createSelector(
    [ getUser, getCurrentGameInfo, (_, props) => props.forOpponent ],
    (user, gameInfo, forOpponent) => {


        if (Object.keys(gameInfo).length === 0){//asdasdsad
            return null;
        }

        if (gameInfo.players.length === 0){
            return null;
        }
        else if (gameInfo.players.length === 1){
            return forOpponent ? null : gameInfo.players[0];
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

        return null;
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