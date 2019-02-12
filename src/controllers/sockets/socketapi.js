const socketId = 0;
const events = require('./socket_events');

class SocketApi {
    constructor(connection) {
        this.connection = connection;
        SocketApi.Instance = this;

        this.connect();
        this.sockets = [];
    }

    connect() {
        this.connection.on('connection', socket => {
            this.sockets.push(socket);
            
            console.log('Socket connected');
            console.log(this.sockets.length);

            // Ask them to load the lights
            // socket.emit(events["event.devices.list"]);

            socket.on('disconnect', () => {
                const index = this.sockets.indexOf(socket);
                this.sockets.splice(index, 1);
                console.log( 'Socket Disconnected', this.sockets.length);
            })
        });
    }

    
}

module.exports = SocketApi;