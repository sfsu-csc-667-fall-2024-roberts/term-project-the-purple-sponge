// Creation of two separate entries representing a game
export const CREATE_GAME = `
INSERT INTO gamerooms(room_name, is_global, is_active, host_user_id, max_players, timer_speed)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *`;

export const CREATE_SESS = `
INSERT INTO game_sessions (gameroom_id, is_active, is_gameover)
VALUES ($1, $2, $3)
RETURNING *`;

// For creating the special global room only used for chatting globally
export const CREATE_GAME_GLOBAL = `
INSERT INTO gamerooms(room_name, is_global, is_active, host_user_id, max_players, timer_speed)
VALUES ('Global Chat Room', TRUE, TRUE, 0, $1, 0)
`;

// Search for all gamerooms EXCLUDING global rooms and inactive ones
export const FETCH_ALL_GAMES = `
SELECT * FROM gamerooms
WHERE is_global=FALSE and is_active=TRUE `;

// Finding games and game sessions
export const SELECT_GAME = `
SELECT id, room_name, is_global, is_active, host_user_id, max_players, timer_speed 
FROM gamerooms WHERE host_user_id=$1 AND id=$2
`;

export const SELECT_SESS = `
SELECT id, gameroom_id, is_active, is_gameover 
FROM game_sessions WHERE gameroom_id=$1 AND id=$2
`;

// Deletion of two separate entries representing a game
export const DELETE_GAME = `
DELETE FROM gamerooms 
WHERE host_user_id=$1 AND id=$2
RETURNING id
`;

export const DELETE_SESS = `
DELETE FROM game_sessions 
WHERE gameroom_id=$1 AND id=$2
RETURNING id
`;

// Addition and Deletion of an entry representing a player's connection to a game
export const JOIN_GAME = `
INSERT INTO lk_users_gamerooms (user_id, gameroom_id)
VALUES ($1, $2)
RETURNING id
`;

export const LEAVE_GAME = `
DELETE FROM lk_users_gamerooms WHERE user_id=$1 AND  gameroom_id=$2 AND id=$3
`;
