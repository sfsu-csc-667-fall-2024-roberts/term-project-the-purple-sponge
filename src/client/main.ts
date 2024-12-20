console.log("hello from bundled asset");
import { io } from "socket.io-client";

// interface for typescript to recognize objects we add to window object
declare global {
  interface Window {
    socket: Socket;
    roomId: number; // TODO: add this in ejs some day
  }
}

// attach the user's socket object to the window object for later use
window.socket = io(); // loads the socket-client
console.log("Socket object of the current user: ", window.socket);

// Test code for socket.io
window.socket.emit("hello", "world", "William", (response: string) => {
  console.log(response);
});

window.socket.on("connect", () => {
  window.socket.emit(
    "clientToServer",
    "The client is speaking to the server",
    (response: string) => {
      console.log("Response from the server: ", response);
    }
  );
});
