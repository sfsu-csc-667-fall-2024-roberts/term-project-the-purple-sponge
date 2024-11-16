import express, { application } from "express";
import httpErrors from "http-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { timeMiddleware } from "./middleware/time";
dotenv.config();

// import all routes from manifest file
import * as routes from "./routes/index";

import liveReloadConfig from "./config/livereload";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(timeMiddleware);
const staticPath = path.join(process.cwd(), "src", "public");
console.log("Static path is: ", staticPath);
app.use(express.static(staticPath)); // referencing static files starts from public folder
liveReloadConfig(app, staticPath);

app.use(cookieParser());

// group up the routes
app.use("/", routes.root);
app.use("/games", routes.games);
app.use("/auth", routes.auth);
app.use("/test", routes.test);

// express goes in sequential order of middleware that is used
// this will be the last thing it tries to match if it is at the bottom
// and will intercept the normal 404 error and give us the one we sent
app.use((request, response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
