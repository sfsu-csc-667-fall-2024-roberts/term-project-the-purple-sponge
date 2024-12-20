console.log("hello from bundled asset");
import { io, Socket } from "socket.io-client";

//const socket = io();
//console.log("socket", socket);

//test

declare global {
    interface Window {
        socket: Socket;
        roomID: number;
    }
}


window.socket = io();
