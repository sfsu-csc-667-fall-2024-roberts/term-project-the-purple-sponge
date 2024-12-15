// Addition and Deletion of an entry representing a player's connection to a game
export const JOIN_GAME = `
INSERT INTO lk_users_gamerooms (user_id, gameroom_id)
VALUES ($1, $2)
RETURNING id
`;

export const LEAVE_GAME = `
DELETE FROM lk_users_gamerooms WHERE user_id=$1 AND  gameroom_id=$2 AND id=$3
`;