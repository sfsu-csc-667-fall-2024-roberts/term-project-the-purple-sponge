import express from "express"; // need to do it the ES6 way to avoid false errors with typescript
import db from "../db/connection";
import { Games, UserConnect, bingoGame } from "../db/dbmanifest";
import type { gameRoom, gameSess } from "../db/games"; // typescript types import
import type { gameLink } from "../db/userGames"; // typescript types import
import { request } from "http";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

// :id stores whatever number is there into params array of the request obj
// id can be sent to the database to search for an already existing game
// or create a new one
router.get("/ingame/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const gameLink = await UserConnect.findUseGameLink(parseInt(`${id}`));
    let idnex = 0;
    for (let link of gameLink) {
      // @ts-expect-error TODO extend session with type later
      if (link.user_id == request.session.user.id) {
        response.render("games/game_screen", { title: `Gamescreen for ${id}` });
        idnex += 1;
      }
    }
    if (idnex === 0) {
      response.redirect("/");
    }
  }
  catch (e) {
    // console.error(e);
  }
  
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
    let gameRooms = await Games.fetchAllGames();
    if (gameRooms) {
      for (let gameroom of gameRooms) {
        const gameLink = await UserConnect.findUseGameLink(gameroom.id);
        if (gameLink[0] == null) {
          Games.deleteGame(gameroom.id);
        }
      }
    }

    gameRooms = await Games.fetchAllGames();
    // console.log("PRTS // Retrieved gamerooms: ", gameRooms);
    response.status(200).json(gameRooms);
  } catch (error) {
    console.error(error);
  }
});

// create a game, link the host user to the game
router.post("/create", async (request, response) => {
  console.log("PRTS // request.body inside /create API", request.body);
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
    console.log("PRTS // gameRoom returned: ", gameroom);
    // maybe wait to create a session when everyone is in the game and the host officially starts the game???
    // const sess_id = await Games.createSess(game_id);

    const linkGameUser: gameLink = await UserConnect.makeUseGameLink(
      host_user_id,
      gameroom.id
    );
    console.log("PRTS // userGame returned: ", linkGameUser);

    request.flash("success", "Your game was successfully created!");
    // response.render("games/waiting_lobby", {
    //   title: `Gamelobby for ${linkGameUser.game_room_id}`,
    // });
    // @ts-expect-error TODO: extend session with type later
    request.session.roomId = parseInt(`${gameroom.id}`);
    response.redirect(`ingame/${gameroom.id}`);
  } catch (error) {
    console.error(error);
    request.flash("error", `Unable to make game: ${error}`);
    response.redirect("/");
  }
});

router.post("/ingame/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.session.user;

  try {
    const gameLink = await UserConnect.findUseGameLink(parseInt(`${id}`));
    for (let link of gameLink) {
      // @ts-expect-error TODO extend session with type later
      if (link.user_id == request.session.user.id) {
        response.render("games/game_screen", { title: `Gamescreen for ${id}` });
      }
    }
  }
  catch (e) {
    // console.error(e);
  }

  try {
    // @ts-expect-error TODO: extend session with type later
    const linkGameUser: gameLink = await UserConnect.makeUseGameLink(user.id, id);
    console.log("PRTS // userGame returned: ", linkGameUser);

    // TODO: how to get session number or do we use game number

    /*
      Create a new bingo card for the game if none exist;
      Else just use the existing bingo card for the game
    */

    // @ts-expect-error TODO: Set string to number type
    if (await bingoGame.cardExists(id, user.id)) {
      // @ts-expect-error TODO: Set string to number type
      await bingoGame.findCard(id, user.id);
    } else {
      // @ts-expect-error TODO: Set string to number type
      await bingoGame.createCard(id, user.id);
    }

    response.render("games/game_screen", { title: `Gamescreen for ${id}` });
    // @ts-expect-error TODO: extend session with type later
    request.session.roomId = parseInt(`${id}`);
  }
  catch (e) {
    console.error(e);
    request.flash("error", `Unable to join game: ${e}`);
    response.redirect("/");
  }
});

router.post("/leave", async (request, response) => {
  // User will leave any games they had joined
  try {
    if (request.session.user) {
      const linkGameUser: gameLink = await UserConnect.deleteUseGameLink(request.session.user.id);
      // @ts-expect-error TODO extend session with type later
      request.session.roomId = 0;
      console.log("PRTS // Successfully left games: ", linkGameUser);
    }
  }
  catch (e) {
    // console.error(e);
  }
});

export const gameUpdate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const socket = request.app.get("io");

  const id = request.params.gameId;
  const gameLink = await UserConnect.findUseGameLink(parseInt(id));

  for (let link of gameLink) {
    socket.to(`user-${link.user_id}`).emit(`game-${id}-update`);
  }
};

export default router;
