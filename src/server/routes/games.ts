import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";
import { Games, UserConnect } from "../db/dbmanifest";
import type { gameRoom, gameSess } from "../db/games"; // typescript types import
import type { gameLink } from "../db/userGames"; // typescript types import

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

// retrieve all available gamerooms from the table and return array of objects containing
// all info for each
router.get("/getGames", async (request, response) => {
  try {
    const gameRooms = await Games.fetchAllGames();
    // console.log("Retrieved gamerooms: ", gameRooms);
    response.status(200).json(gameRooms);
  } catch (error) {
    console.error(error);
  }
});

// create a game, link the host user to the game
router.post("/create", async (request, response) => {
  console.log("request.body inside /create API", request.body);
  const { room_name, max_players, timer_speed } = request.body;

  // @ts-expect-error TODO: figure what type this needs to be
  const host_user_id = request.session.user.id; // grab the user id from stored login data
  try {
    const gameroom: gameRoom = await Games.createGame(
      room_name,
      host_user_id,
      max_players,
      timer_speed
    );
    console.log("gameRoom returned: ", gameroom);
    // maybe wait to create a session when everyone is in the game and the host officially starts the game???
    // const sess_id = await Games.createSess(game_id);

    const linkGameUser: gameLink = await UserConnect.makeUseGameLink(
      host_user_id,
      gameroom.id
    );
    console.log("userGame returned: ", linkGameUser);

    request.flash("success", "Your game was successfully created!");
    response.render("games/waiting_lobby", {
      title: `Gamelobby for ${linkGameUser.game_room_id}`,
    });
  } catch (error) {
    console.error(error);
    request.flash("error", `Unable to make game: ${error}`);
    response.redirect("/");
  }
});

router.put("/ingame/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.session.user;

  try {
    // @ts-expect-error TODO: extend session with user type
    const linkGameUser: gameLink = await UserConnect.makeUseGameLink(user.id, id);
    console.log("userGame returned: ", linkGameUser);

    response.render("games/game_screen", { title: `Gamescreen for ${id}` });
  }
  catch (e) {
    console.error(e);
    request.flash("error", `Unable to join game: ${e}`);
    response.redirect("/");
  }
});

export default router;
