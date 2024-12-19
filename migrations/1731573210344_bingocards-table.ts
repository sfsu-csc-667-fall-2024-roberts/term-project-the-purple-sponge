import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table bingo_cards {
//   id int [pk, increment]
//   session_id int [ref: > game_sessions.id] // FK referencing game_session that this card belongs to
//   user_id int [ref: > users.id] // FK referencing user that owns this card
//   card_data json // JSON representation of the bingo card
//   card_marker_locations json
//   is_bingo boolean // Indicates if bingo has been achieved on this card
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("bingo_cards", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    session_id: {
      type: "integer",
      references: "game_sessions",
    },
    user_id: {
      type: "integer",
      references: "users",
    },
    card_data: {
      type: "integer[5][5]",
    },
    card_marker_locations: {
      type: "boolean[5][5]",
    },
    is_bingo: {
      type: "boolean",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("bingo_cards");
}
