import { Server } from "http";
import type { Express, RequestHandler } from "express";
import { Server as SocketIoServer } from "socket.io";

let io: SocketIoServer | undefined;

export default function (
  server: Server,
  app: Express,
  sessionMiddleware: RequestHandler
) {
  if (io === undefined) {
    io = new SocketIoServer(server);
    app.set("io", io);
    io.on("connection)", (socket) => {
      console.log(`client connected: ${socket.request.session.id}`);
    });
  }
}
