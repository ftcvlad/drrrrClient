import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGames= (state) => {return state.games};

export const getCurrentGame = createSelector(
    [ getUser, getAllGames ],
    (user, allGames) => {
        let playerIds = [];
        let watcherIds = [];
        for (let i=0; i<allGames.length; i++) {
            playerIds = allGames[i].players.map(p=>p.id);
            watcherIds = allGames[i].watchers.map(w=>w.id);
            if (playerIds.indexOf(user.id)>-1 || watcherIds.indexOf(user.id)>-1){
                return allGames[i];
            }
        }



        return null;
    }
);


export const getChatMessages = createSelector(
    [ getUser, getAllGames ],
    (user, allGames) => {
        let playerIds = [];
        let watcherIds = [];
        for (let i=0; i<allGames.length; i++) {
            playerIds = allGames[i].players.map(p=>p.id);
            watcherIds = allGames[i].watchers.map(w=>w.id);
            if (playerIds.indexOf(user.id)>-1 || watcherIds.indexOf(user.id)>-1){
                return allGames[i].chatMessages;
            }
        }

        return [];
    }
);