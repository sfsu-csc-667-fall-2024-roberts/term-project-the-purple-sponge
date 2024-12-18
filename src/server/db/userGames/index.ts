import db from "../connection";
import { JOIN_GAME, LEAVE_GAME } from "./sql";

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
  console.log("User " + user_id + " joining Game:" + gameroom_id);
  return await db.one(JOIN_GAME, [user_id, gameroom_id]);
};

const deleteUseGameLink = async (
  user_id: number,
  gameroom_id: number
): Promise<gameLink> => {
  console.log("User " + user_id + " leaving Game" + gameroom_id);
  return await db.one(LEAVE_GAME, [user_id, gameroom_id]);
};

export default { makeUseGameLink, deleteUseGameLink };
export type { gameLink };
