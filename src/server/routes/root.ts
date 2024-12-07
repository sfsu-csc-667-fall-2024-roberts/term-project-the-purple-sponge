import express from "express";

const router = express.Router();

// type TestRecord = {
//   id: number;
//   test_string: string;
// };

router.get("/", (request, response) => {
  response.render("root", { info: "blue" });
  // response.render tells application to find our template named "root"
});

router.get("/landingpageunauth", (request, response) => {
  response.render("landing_page_unauth");
});

router.get("/landingpageauth", (request, response) => {
  response.render("landing_page_auth");
});

router.get("/login", (request, response) => {
  response.render("login_page");
});

router.get("/signup", (request, response) => {
  response.render("signup_page");
});

export default router;
