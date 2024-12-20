console.log(
  "hello this file test whether webpack successfully bundled the assets together"
);
import { io, Socket } from "socket.io-client";

// interface to declare the window object and that it has a socket and roomID attribute
declare global {
  interface Window {
    socket: Socket;
    roomID: number;
  }
}
// This makes the connection from the client to the server
// and pins it to the global window object of the browser
window.socket = io();
