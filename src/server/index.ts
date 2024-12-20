import express, { application } from "express";
import httpErrors from "http-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { createServer } from "http";
dotenv.config();

// import from manifest files
import * as routes from "./routes/routesmanifest";
import * as configurations from "./config/configmanifest";
import * as middleware from "./middleware/middlewaremanifest";

const app = express();
const server = createServer(app); // create server for use with socket.io
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(middleware.timeMiddleware);

// bootstrap css and js
app.use(
  "/css",
  express.static(path.join(process.cwd(), "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(process.cwd(), "node_modules/bootstrap/dist/js"))
);

const staticPath = path.join(process.cwd(), "src", "public");
console.log("Static path is: ", staticPath);
app.use(express.static(staticPath)); // referencing static files starts from public folder
app.use(cookieParser("secret")); // must be before express-sessions

configurations.configureLiveReload(app, staticPath);
configurations.configureSession(app);
configurations.configureSocketIO(
  server,
  app,
  configurations.configureSession(app)
);

// group up the routes
app.use("/", routes.root);
app.use("/games", middleware.authenticationMiddleware, routes.games);
app.use("/auth", routes.auth);
app.use("/test", routes.test);

// express goes in sequential order of middleware that is used
// this will be the last thing it tries to match if it is at the bottom
// and will intercept the normal 404 error and give us the one we sent
app.use((request, response, next) => {
  next(httpErrors(404));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
