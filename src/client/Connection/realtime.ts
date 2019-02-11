import io from 'socket.io-client';

export const RTConnection = new class RTConnection_ {
    
    private connection: SocketIOClient.Socket;

    constructor() {
        this.connection = io('/');
    }

    subscribe(event: string, callBack) {
        this.connection.on(event, callBack);
    }
}

console.log(RTConnection);