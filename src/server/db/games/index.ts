import db from "../connection";
import {
  CREATE_GAME,
  DELETE_GAME,
  CREATE_SESS,
  DELETE_SESS,
  SELECT_GAME,
  SELECT_SESS,
  FETCH_ALL_GAMES,
  SET_TIMER,
  GET_TIMER,
  CALL_NUMBER
} from "./sql";

// Types to help with everything
type gameRoom = {
  id: number;
  room_name: string;
  is_global: boolean;
  is_active: boolean;
  host_user_id: number;
  max_players: number;
  timer_speed: number;
  created_at: Date;
};

type gameSess = {
  id: number;
  gameroom_id: number;
  is_active: boolean;
  is_gameover: boolean;
  created_at: Date;
};

/*
  Creation and Deletion of games
*/

// Create a new game
const createGame = async (
  room_name: string,
  host_user_id: number,
  max_players: number,
  timer_speed: number
): Promise<gameRoom> => {
  console.log("Creating new Game");
  return await db.one(CREATE_GAME, [
    room_name,
    false,
    true,
    host_user_id,
    max_players,
    timer_speed,
  ]);
};

// Fetch all games
const fetchAllGames = async (): Promise<gameRoom[]> => {
  return await db.any(FETCH_ALL_GAMES);
};

// Create a game session
const createSess = async (gameroom_id: number): Promise<gameSess> => {
  console.log("Creating new GameSession");
  return await db.one(CREATE_SESS, [gameroom_id, false, false]);
};

/*
  Game finder
*/

const findGame = async (
  gameroom_id: number
): Promise<gameRoom> => {
  console.log("Getting information from Game " + gameroom_id);
  return await db.one(SELECT_GAME, [gameroom_id]);
};

const findSess = async (
  gameroom_id: number,
  gamesess_id: number
): Promise<gameSess> => {
  console.log(
    "Getting information from GameSession " +
      gamesess_id +
      "for Game " +
      gameroom_id
  );
  return await db.one(SELECT_SESS, [gameroom_id, gamesess_id]);
};

// Delete a new game
const deleteGame = async (
  gameroom_id: number
): Promise<number> => {
  console.log("Deleting Game " + gameroom_id);
  return await db.one(DELETE_GAME, [gameroom_id]);
};

// Delet a game session
const deleteSess = async (
  gameroom_id: number,
  gamesess_id: number
): Promise<gameSess> => {
  console.log(
    "Deleting GameSession " + gamesess_id + "for Game " + gameroom_id
  );
  return await db.one(DELETE_SESS, [gameroom_id, gamesess_id]);
};

// Set timer start
const setTimer = async (
  gameroom_id: number,
  timer_start: number
): Promise<any> => {
  return await db.any(SET_TIMER, [gameroom_id, timer_start]);
}

// Get timer start
const getTimer = async (
  gameroom_id: number
): Promise<any> => {
  return await db.any(GET_TIMER, [gameroom_id]);
}

// Call number
const callNumber = async (
  gameroom_id: number,
  number: number
): Promise<any> => {
  return await db.any(CALL_NUMBER, [gameroom_id, number]);
}

export default {
  createGame,
  createSess,
  fetchAllGames,
  findGame,
  findSess,
  deleteGame,
  deleteSess,
  setTimer,
  getTimer,
  callNumber
};
export type { gameRoom, gameSess };
