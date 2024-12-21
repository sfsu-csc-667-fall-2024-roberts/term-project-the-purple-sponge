import { Server } from "http";
import type { Express, RequestHandler } from "express";
import { Server as SocketIoServer, Socket } from "socket.io";

let io: SocketIoServer | undefined;

const bindSession = async (socket: Socket) => {
  const { request } = socket;

  const {
    user: { id: userId } = {},
    roomId,
    // @ts-expect-error TODO figure out the typing for session on request
  } = request.session;

  // TODO: Figure out what this does and how to use it
  // TODO there's a bug here; if the user has created a game, the game id is not yet parsed from the url parameters
  socket.join("global"); // automatically join a user to the global chat
  // socket.join(`chat-${roomId}`);
  // socket.join(`game-${roomId}`);

  socket.use((_, next) => {
    console.log("Packet info: ", _);
    // @ts-expect-error TODO figure out the typing for session on request
    request.session.reload((error) => {
      if (error) {
        socket.disconnect();
      } else {
        next();
      }
    });
  });
};

export default function (
  server: Server,
  app: Express,
  sessionMiddleware: RequestHandler
): SocketIoServer {
  if (io === undefined) {
    io = new SocketIoServer(server);

    app.set("io", io); // can be retreived later with app.get("io")
    io.engine.use(sessionMiddleware);

    io.on("connection", async (socket) => {
      await bindSession(socket);
      // @ts-expect-error TODO figure out the typing for session on request
      console.log(`client connected (${socket.request.session.id})`);
      socket.on("disconnect", () => {
        // @ts-expect-error TODO figure out the typing for session on request
        console.log(`client disconnected (${socket.request.session.id})`);
      });
    });
  }

  return io;
}
