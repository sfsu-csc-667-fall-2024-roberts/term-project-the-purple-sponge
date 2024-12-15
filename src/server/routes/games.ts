import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";
import { Games, UserConnect } from "../db/dbmanifest";

const router = express.Router();

// :id stores whatever number is there into params array of the request obj
// id can be sent to the database to search for an already existing game
// or create a new one
router.get("/:id", (request, response) => {
  const { id } = request.params;
  response.render("games/game_screen", { title: `Gamescreen for ${id}` });
});

router.get("/:id/waitinglobby", (request, response) => {
  const { id } = request.params;
  response.render("games/waiting_lobby", { title: `Gamelobby for ${id}` });
});

router.get("/create", async (request, response) => {
  const { roomname, is_global, user_id } = request.params;
  try {

    const game_id = await Games.createGame(roomname, is_global, user_id);
    const sess_id = await Games.createSess(game_id);
    const connect_id = await UserConnect.makeUseGameLink(user_id, game_id);

    request.flash("success", "Your game was successfully created!");
    response.render("games/waiting_lobby", { title: `Gamelobby for ${game_id}` });

  } catch (error) {
    console.error(error);
    request.flash("error", `Unable to make game: ${error}`);
    response.redirect("root");
  }
});

export default router;
