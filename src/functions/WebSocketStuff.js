import {updateGameList, createGameSucceed, playGameSucceed} from '../actions/gameActions';

export const messageTypes = {
     JOIN_ROOM: "joinRoom",
     JOINED_ROOM :"joinedRoom",
     ERROR : "error",
     BROADCAST_GAME_CREATED: 'broadcastGameCreated',
     BROADCAST_PLAYER_JOINED: 'broadcastPlayerJoined',
     USER_MOVE: 'userMove'
};

export const roomCategories={
    TABLE_64_ROOM: "table64room",
    TABLE_100_ROOM: "table100room",
    GAME_ROOM: "gameRoom"
};

export function setupWebSocketConnection(initialRoom, redirectUnauthorised, redirectNotInGame, dispatch){
    let conn = new WebSocket('ws://localhost:8090/');
    conn.onopen = function(e) {
        console.log("Connection established!");
       // conn.send(JSON.stringify({type: 'joinRoom', room:initialRoom}));
        window.socketConnection = conn;
        joinRoom(initialRoom);//!!! what if con.close() was fired?

    };

    conn.onmessage = function(e) {//sdfsdfsdfsdfdsfsdfsdf

        console.log("server message: "+e.data);


        let data = JSON.parse(e.data);

        if (data.servMessType === messageTypes.ERROR){

            if (data.status === 403){//not in game
                redirectNotInGame();
            }
            else if (data.status === 401){//unauthorised
                redirectUnauthorised();
            }
        }
        else if (data.servMessType === messageTypes.JOINED_ROOM){
            dispatch(updateGameList(data.data));
        }
        else if (data.servMessType === messageTypes.BROADCAST_GAME_CREATED){
            dispatch(createGameSucceed(data.data));
        }
        else if (data.servMessType === messageTypes.BROADCAST_PLAYER_JOINED){
            dispatch(playGameSucceed(data.data));
        }



    };

    conn.onclose = function(e){
        console.log('connection closed!');
        window.socketConnection = null;

    };

}

export function joinRoom(room){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.JOIN_ROOM, roomCategory:room}));
}

export function broadcastGameCreated(){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.BROADCAST_GAME_CREATED}));
}

export function broadcastPlayerJoined(gameId){
    console.log('broadcast player joined sent!'+gameId);
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.BROADCAST_PLAYER_JOINED, gameId: gameId}));
}

export function userMove(moveInfo){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.USER_MOVE, moveInfo:moveInfo}));
}