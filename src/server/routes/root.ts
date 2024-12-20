import express from "express";
import { Games, UserConnect } from "../db/dbmanifest";
import type { gameLink } from "../db/userGames"; // typescript types import

const router = express.Router();

// type TestRecord = {
//   id: number;
//   test_string: string;
// };

router.get("/", async (request, response) => {
  response.render("root", {
    title: "Welcome to the home page!",
    flashMessagesSuccess: request.flash("success"),
    flashMessagesError: request.flash("error"),
    session: request.session
  });
  // response.render tells application to find our template named "root"
});

export default router;
