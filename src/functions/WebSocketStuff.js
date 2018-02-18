import {updateGameList} from '../actions/gameActions';

const messageTypes = {
     JOIN_ROOM: "joinRoom",
     JOINED_ROOM :"joinedRoom",
     ERROR : "error"
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



    };

    conn.onclose = function(e){
        console.log('connection closed!');
        window.socketConnection = null;

    };

}

export function joinRoom(room){
    window.socketConnection.send(JSON.stringify({msgType: messageTypes.JOIN_ROOM, roomCategory:room}));
}