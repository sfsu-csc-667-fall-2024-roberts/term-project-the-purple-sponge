console.log("hello from bundled asset");
import { io, Socket } from "socket.io-client";

declare global {
    interface Window {
        socket: Socket;
        roomId: number;
    }
}

// const socket = io();
// console.log("socket", socket);
window.socket = io();
