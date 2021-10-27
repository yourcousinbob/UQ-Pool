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
        return new Promise( resolve => {
            this.socket.on(message, (body) => {
                let data = JSON.parse(body)

                switch(message){

                    case "login":
                        console.log(data.log)
                        break

                    case "logout":
                        console.log(data.msg)
                        break

                    case "location":
                        break

                    case "get":
                        resolve(data)
                        break

                    case "cancel":
                        break

                    case "accept":
                        break

                    case "reject":
                        break

                    case "add":
                        console.log(data.msg)
                        break
                    
                    case "ask":
                        resolve(data)
                        break;
                    case "removeDriver":
                        console.log(data.msg)
                        break
                    case "join":
                        resolve(data)
                        break

                    case "sendMessage":
                        resolve(data)
                        break
                }
            })
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
