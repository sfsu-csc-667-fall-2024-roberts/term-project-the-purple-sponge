import db from "../connection";
import { FIND_GAME, JOIN_GAME, LEAVE_GAME } from "./sql";

type gameLink = {
  id: number;
  user_id: number;
  game_room_id: number;
};

// For players to join and leave games
const makeUseGameLink = async (
  user_id: number,
  gameroom_id: number
): Promise<gameLink> => {
  console.log("User " + user_id + " joining Game: " + gameroom_id);
  return await db.one(JOIN_GAME, [user_id, gameroom_id]);
};

const deleteUseGameLink = async (
  user_id: number
): Promise<gameLink> => {
  // console.log("User " + user_id + " leaving game");
  return await db.one(LEAVE_GAME, [user_id]);
};

const findUseGameLink = async (gameroom_id: number): Promise<number> => {
  console.log("Searching for users in Game: " + gameroom_id);
  const gameLink = await db.any(FIND_GAME, [gameroom_id]);
  if (gameLink) {
    let idnex = 0;
    for (let game of gameLink) {
      idnex += 1;
    }

    return idnex;
  }
  else {
    return 0;
  }
}

export default { makeUseGameLink, deleteUseGameLink, findUseGameLink };
export type { gameLink };
