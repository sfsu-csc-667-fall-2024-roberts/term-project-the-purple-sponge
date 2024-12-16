// All the SQL for creating the game rooms
// Reference: https://www.npmjs.com/package/pg-promise
// All logged in users join a global "gameroom" that acts as an initial chatroom

// To create a game room we need:
// Room name, is_global value default to false, is_active, host_user_id, max players default to 4,
// timer speed in seconds (1 to 10 seconds)
// timestamp is automatic don't need to write it
export const CREATE_GAMEROOM = `
INSERT INTO gamerooms(room_name, is_global, is_active, host_user_id, max_players, timer_speed)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id`;

// For creating the special global room only used for chatting globally
export const CREATE_GAMEROOM_GLOBAL = `
INSERT INTO gamerooms(room_name, is_global, is_active, host_user_id, max_players, timer_speed)
VALUES ('Global Chat Room', TRUE, TRUE, 0, $1, 0)
`;

// Search for all gamerooms EXCLUDING global rooms and inactive ones
export const FETCH_ALL_GAMEROOMS = `
SELECT * FROM gamerooms
WHERE is_global=FALSE and is_active=TRUE `;
