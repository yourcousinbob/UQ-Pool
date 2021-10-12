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
