import {joinRoomPlaySuccess,
        broadcastGameCreatedSuccess,
        joinRoomTablesSuccess,
        table_BroadcastPlayerJoinedSuccess,
        tables_BroadcastPlayerJoinedSuccess,
        userPickSucceed,
        userMoveSucceed} from '../actions/gameActions';
import {receiveChatMessage} from '../actions/chatActions';

export const messageTypes = {
     JOIN_ROOM_TABLES: "joinRoomTables",
     JOIN_ROOM_PLAY: "joinRoomPlay",
     ERROR : "error",
     BROADCAST_GAME_CREATED: 'broadcastGameCreated',
     BROADCAST_PLAYER_JOINED: 'broadcastPlayerJoined',
     BROADCAST_PLAYER_JOINED_TO_TABLE: 'broadcastPlayerJoinedToTable',
     BROADCAST_PLAYER_JOINED_TO_TABLES: 'broadcastPlayerJoinedToTables',
     USER_MOVE: 'userMove',
     USER_PICK: 'userPick',
     SEND_CHAT_MESSAGE: 'sendChatMessage'
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
        if (initialRoom === roomCategories.GAME_ROOM){
            joinRoomPlay();//!!! what if con.close() was fired?
        }
        else if (initialRoom === roomCategories.TABLE_64_ROOM){
            joinRoomTables(roomCategories.TABLE_64_ROOM);
        }


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
        else if (data.servMessType === messageTypes.JOIN_ROOM_PLAY){
            dispatch(joinRoomPlaySuccess(data.data));
        }
        else if (data.servMessType === messageTypes.JOIN_ROOM_TABLES){
            dispatch(joinRoomTablesSuccess(data.data));
        }
        else if (data.servMessType === messageTypes.BROADCAST_GAME_CREATED){
            dispatch(broadcastGameCreatedSuccess(data.data));
        }
        else if (data.servMessType === messageTypes.BROADCAST_PLAYER_JOINED_TO_TABLE){
            dispatch(table_BroadcastPlayerJoinedSuccess(data.data));
        }
        else if (data.servMessType === messageTypes.BROADCAST_PLAYER_JOINED_TO_TABLES){
            dispatch(tables_BroadcastPlayerJoinedSuccess(data.data));
        }
        else if (data.servMessType === messageTypes.USER_PICK){
            dispatch(userPickSucceed(data.data));
        }
        else if (data.servMessType === messageTypes.USER_MOVE){
            dispatch(userMoveSucceed(data.data));
        }
        else if (data.servMessType === messageTypes.SEND_CHAT_MESSAGE){
            dispatch(receiveChatMessage(data.data));
        }

    };

    conn.onclose = function(e){
        console.log('connection closed!');
        window.socketConnection = null;

    };

}


export function joinRoomPlay(){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.JOIN_ROOM_PLAY}));
}

export function joinRoomTables(roomCategory){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.JOIN_ROOM_TABLES, roomCategory: roomCategory}));
}

export function broadcastGameCreated(){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.BROADCAST_GAME_CREATED}));
}

export function broadcastPlayerJoined(gameId){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.BROADCAST_PLAYER_JOINED, gameId: gameId}));
}

export function userPick(moveInfo, gameId){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.USER_PICK, moveInfo:moveInfo, gameId}));
}


export function userMove(moveInfo, gameId){

    window.socketConnection.send(JSON.stringify({msgType: messageTypes.USER_MOVE, moveInfo:moveInfo, gameId}));
}

export function sendMessage(msgObj, gameId){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.SEND_CHAT_MESSAGE, msgObj:msgObj, gameId}));
}