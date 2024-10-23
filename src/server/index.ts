import express from "express";
import httpErrors from "http-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

// middleware
import { timeMiddleware } from "./middleware/time";

// routes
import rootRoutes from "./routes/root";

dotenv.config(); // make sure that this is above all your code

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));

// express supports json and and url encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(timeMiddleware);
app.use(express.static(path.join(process.cwd(), "src", "public"))); // root directory all the way to the public folder
app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");
app.use("/", rootRoutes);

// express goes in sequential order of middleware that is used
// this will be the last thing it tries to match if it is at the bottom
// and will intercept the normal 404 error and give us the one we sent
app.use((request, response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
