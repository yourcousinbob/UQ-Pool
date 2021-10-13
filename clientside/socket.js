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
        this.socket.emit(message, JSON.stringify(payload));
    }

    recievePayload(message) {
        this.socket.on(message, (body) => {
            let data = JSON.parse(body)

            switch(message){

            case "login":
                console.log(msg.log)

            case "logout":

            case "location":

            case "request":

            case "cancel":

            case "accept":

            case "reject":
                
            }
        });
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
