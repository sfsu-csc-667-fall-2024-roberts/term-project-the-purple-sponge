import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";

const router = express.Router();

// :id stores whatever number is there into params array of the request obj
// id can be sent to the database to search for an already existing game
// or create a new one
router.get("/ingame/:id", (request, response) => {
  const { id } = request.params;
  response.render("games/game_screen", { title: `Gamescreen for ${id}` });
});

router.get("/creategame", (request, response) => {
  response.render("games/create_game", { title: "Create a Game" });
});

router.get("/waitinglobby/:id", (request, response) => {
  const { id } = request.params;
  response.render("games/waiting_lobby", { title: `Gamelobby for ${id}` });
});

export default router;
