// Addition and Deletion of an entry representing a player's connection to a game
export const JOIN_GAME = `
INSERT INTO lk_users_gamerooms (user_id, game_room_id)
VALUES ($1, $2)
RETURNING *
`;

export const LEAVE_GAME = `
DELETE FROM lk_users_gamerooms WHERE user_id = $1
`;

export const FIND_GAME = `
SELECT * FROM lk_users_gamerooms WHERE game_room_id = $1
`