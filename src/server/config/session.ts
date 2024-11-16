import connectPgSimple from "connect-pg-simple";
import type { Express, RequestHandler } from "express";
import flash from "express-flash";
import session from "express-session";

let sessionMiddleware: RequestHandler | undefined = undefined;
export default (app: Express): RequestHandler | undefined => {
  // create a session middleware undefined
  // create a session table in the database using connect-pg-simple
  // add a session secret property to the .env that is not created yet
  if (sessionMiddleware === undefined) {
    sessionMiddleware = session({
      store: new (connectPgSimple(session))({
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: true,
      saveUninitialized: true,
    });
    app.use(sessionMiddleware);
    app.use(flash());
  }
  return sessionMiddleware;
};
