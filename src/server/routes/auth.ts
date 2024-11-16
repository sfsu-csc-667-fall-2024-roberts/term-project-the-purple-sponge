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

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await Users.login(email, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;
    // response.json(user);
    response.redirect("/landingpageauth");
  } catch (error) {
    console.error(error);

    request.flash("error", "Failed to register user");
    response.redirect("/auth/login");
  }
});

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const user = await Users.register(username, email, password);
    // @ts-expect-error TODO: Define the session type for the user object
    request.session.user = user;
    // response.json(user);
    response.redirect("/landingpageauth");
  } catch (error) {
    console.error(error);
    request.flash("error", error as string);
    response.redirect("/auth/register");
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

export default router;
