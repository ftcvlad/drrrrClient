import { createSelector } from 'reselect';
import {getUser} from './userSelector';


export const getAllGames= (state) => {return state.games};

export const getCurrentGame = createSelector(
    [ getUser, getAllGames ],
    (user, allGames) => {
console.log("game selector!");
        for (let i=0; i<allGames.length; i++) {
            if (allGames[i].players.indexOf(user.id)>-1 || allGames[i].watchers.indexOf(user.id)>-1){
                return allGames[i];
            }
        }



        return null;
    }
);