import db from "../connection";
import { CREATE_GAME, DELETE_GAME, CREATE_SESS, DELETE_SESS, SELECT_GAME, SELECT_SESS } from "./sql";


// Types to help with everything
type gameRoom = {
    id: number;
    room_name: string;
    is_global: boolean;
    is_active: boolean;
    host_user_id: number;
    max_players: number;
    timer_speed: number;
};

type gameSess = {
    id: number;
    gameroom_id: number;
    is_active: boolean;
    is_gameover: boolean;
};

/*
  Creation and Deletion of games
*/

// Create a new game 
const createGame = async (
    room_name: string,
    is_global: boolean,
    host_user_id: number
): Promise<number> => {
    console.log("Creating new Game");
    return await db.one(CREATE_GAME, [room_name, false, is_global, host_user_id]);
};

// Create a game session
const createSess = async (
    gameroom_id: number
): Promise<number> => {
    console.log("Creating new GameSession");
    return await db.one(CREATE_SESS, [gameroom_id, false, false]);
};



/*
  Game finder
*/

const findGame = async (
    host_user_id: number,
    gameroom_id: number
): Promise<gameRoom> => {
    console.log("Getting information from Game " + gameroom_id);
    return await db.one(SELECT_GAME, [host_user_id, gameroom_id]);
};

const findSess = async (
    gameroom_id: number,
    gamesess_id: number
): Promise<gameSess> => {
    console.log("Getting information from GameSession "+ gamesess_id + "for Game " + gameroom_id);
    return await db.one(SELECT_SESS, [gameroom_id, gamesess_id]);
};



// Delete a new game 
const deleteGame = async (
    host_user_id: number,
    gameroom_id: number
): Promise<number> => {
    console.log("Deleting Game " + gameroom_id);
    return await db.one(DELETE_GAME, [host_user_id, gameroom_id]);
};

// Delet a game session
const deleteSess = async (
    gameroom_id: number,
    gamesess_id: number
): Promise<number> => {
    console.log("Deleting GameSession "+ gamesess_id + "for Game " + gameroom_id);
    return await db.one(DELETE_SESS, [gameroom_id, gamesess_id]);
};


export default { createGame, createSess, findGame, findSess, deleteGame, deleteSess };