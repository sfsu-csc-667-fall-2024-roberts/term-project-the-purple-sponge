import { Server } from "http";
import type { Express, RequestHandler } from "express";
import { Server as SocketIoServer, Socket } from "socket.io"; // import Server with an alias and Socket from socket.io

let io: SocketIoServer | undefined; // create a type

// takes the request
const bindSession = async (socket: Socket) => {
  const { request } = socket;

  // destructure the expected session object from the request object
  // we get from the socket object that is passed in
  // @ts-expect-error TODO: figure out the typing for session on request
  const { user: { id: userId } = {}, roomId } = request.session;
  console.log("printing userId: ", userId);

  // TODO: Figure out what this does and how to use it
  // TODO there's a bug here; if the user has created a game, the game id is not yet parsed from the url parameters
  // socket.join(`game-${roomId}-user-${userId}`);
  // socket.join(`chat-${roomId}`);
  // socket.join(`game-${roomId}`);

  // .use() works like a middleware
  socket.use((_, next) => {
    console.log("Packet.data: ", _);

    // @ts-expect-error TODO figure out the typing for session on request
    // get the latest updates by retreiving data from session store to the session variable
    request.session.reload((error) => {
      if (error) {
        socket.disconnect();
      } else {
        next();
      }
    });
  });
};

// take in http.server, express app, and sessionMiddleWar
// return a newly created socket.io server
export default function (
  server: Server,
  app: Express,
  sessionMiddleware: RequestHandler
): SocketIoServer {
  if (io === undefined) {
    io = new SocketIoServer(server);

    app.set("io", io);
    io.engine.use(sessionMiddleware);

    // when a user connects through their socket, this event triggers and we get their socket
    io.on("connection", async (socket) => {
      await bindSession(socket);

      // @ts-expect-error TODO figure out the typing for session on request
      console.log(`client connected (${socket.request.session.id})`);

      // event that waits to receive a request with "hello" as the name of the event
      // callback function parameter can
      socket.on("hello", (arg, arg2, callback) => {
        console.log("arg1:", arg); // "world"
        console.log("arg2", arg2);
        // calls the callback function that was passed in with these parameters
        callback("This is callback being called");
      });

      socket.on("clientToServer", (message, callback) => {
        console.log(`Server received message from client: ${message}`);
        callback("Server sending a reply!");
      });

      socket.on("disconnect", () => {
        // @ts-expect-error TODO figure out the typing for session on request
        console.log(`client disconnected (${socket.request.session.id})`);
      });
    });
  }

  return io;
}
