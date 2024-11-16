import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";
import { Users } from "../db/dbmanifest";

const router = express.Router();

router.get("/login", (request, response) => {
  console.log("login route called");
  response.render("auth/login_page", { title: "Login Page" });
});

router.get("/register", (request, response) => {
  console.log("register route called");
  response.render("auth/signup_page", { title: "Sign Up Page" });
});

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const user = await Users.register(username, email, password);
    // response.json(user);
    response.redirect("/landingpageauth");
  } catch (error) {
    console.error(error);
    response.redirect("/auth/register");
  }
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await Users.login(email, password);
    // response.json(user);
    response.redirect("/landingpageauth");
  } catch (error) {
    console.error(error);
    response.redirect("/auth/login");
  }
});

export default router;
