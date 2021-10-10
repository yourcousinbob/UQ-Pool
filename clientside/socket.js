import { io } from "socket.io-client";

class SocketConnection {

    constructor() {
        this.socket = null;
    }

    connect() {
        socket = io('https://uqpool.xyz:7777')

        io.use(function(socket, next) {
            middleware(socket.request, socket.request.res, next);
        });

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
    }

    static init() {
        if(!connection) {
            connection = new SocketConnection();
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

export let connect = SocketConnection.init;
export let connection = SocketConnection.getConnection;
