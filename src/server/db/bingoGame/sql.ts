// Creation and deletion of a card
export const CREATE_CARD = `
INSERT INTO bingocards(session_id, user_id, card_data, card_marker_locations, is_bingo)
VALUES ($1, $2, $3, $4, FALSE)
RETURNING *`;

export const DELETE_CARD = `
DELETE FROM bingocards
WHERE id=$1 AND session_id=$2 AND user_id=$3 
RETURNING *`;

// Getting entry of a card
export const SELECT_CARD = `
SELECT *
FROM bingocards WHERE id=$1 AND session_id=$2 AND user_id=$3
`;

// Saves changes to marked (Assuming it means that true spaces are numbers drawn in the game)
export const UPDATE_MARKED = `
UPDATE bingocards
SET card_marker_locations=$1
WHERE id=$2 AND session_id=$3 AND user_id=$4
RETURNING *`;