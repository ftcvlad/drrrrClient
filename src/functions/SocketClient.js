import {joinRoomPlay, joinRoomTables, roomCategories} from "./WebSocketStuff";


export default class SocketClient {
    socket;

    connect() {
        this.socket = new WebSocket('ws://localhost:8090/');

        return new Promise((resolve, reject) => {
            this.socket.onopen = function(e){
                console.log("Connection established!");
                window.socketConnection = true;//TODO remove
                resolve();
            };
            this.socket.onerror = function(e){
                console.log("ws error!");
                reject(e);
            };

            this.socket.onclose = function(){
                console.log('connection closed!');
                window.socketConnection = false;
            }

        });





    }

    // disconnect() {
    //     return new Promise((resolve) => {
    //         this.socket.disconnect(() => {
    //             this.socket = null;
    //             resolve();
    //         });
    //     });
    // }

    send(data) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.');

            return this.socket.send(data, (response) => {
                // Response is the optional callback that you can use with socket.io in every request. See 1 above.
                if (response.error) {
                    console.error(response.error);
                    return reject(response.error);
                }

                return resolve();
            });
        });
    }

    // on(event, fun) {
    //     // No promise is needed here, but we're expecting one in the middleware.
    //     return new Promise((resolve, reject) => {
    //         if (!this.socket) return reject('No socket connection.');
    //
    //         this.socket.on(event, fun);
    //         resolve();
    //     });
    // }
}