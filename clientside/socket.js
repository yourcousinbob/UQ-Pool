import { io } from "socket.io-client";

let connection = null

class SocketConnection {

    constructor(url) {
        this.socket = null;
        this.url = url
    }

    connect() {
        socket = io(this.url)

        if (socket.connected = false) {
            throw 'Failed to connect to socket';
        }
        this.socket = socket
        console.log('Connected to socket')
    }

    sendPayload(message, payload) {
        this.socket.emit(message, payload);
    }

    recievePayload(message, payload) {
        this.socket.on(message, payload);
        switch(message){

            case "login":
                this.socket.on(message, user => {
                });
            case "logout":
                this.socket.on(message, user => {
                });

            case "location":
                this.socket.on(message, user => {
                });

            case "request":
                this.socket.on(message, user => {
                });

            case "cancel":
                this.socket.on(message, user => {
                });

            case "accept":
                this.socket.on(message, user => {
                });

            case "reject":
                this.socket.on(message, user => {
                });
        
        }
    } 



    static init(url) {
        if(!connection) {
            connection = new SocketConnection(url);
            connection.connect();
        }
    }

    static getConnection() {
        if(!connection) {
            throw 'No active connection';
        }
        return connection;
    }
}

export default SocketConnection;
