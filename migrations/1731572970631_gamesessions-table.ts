import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table game_sessions {
//   id int [pk, increment]
//   gameroom_id int [ref: > gamerooms.id]
//   is_active boolean // Indicates if the session is currently in play
//   is_gameover boolean // Indicates if the game over and closed
//   created_at timestamp
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("game_sessions", {
    id: "id",
    gameroom_id: {
      type: "integer",
      references: "gamerooms",
    },
    is_active: {
      type: "boolean",
    },
    is_gameover: {
      type: "boolean",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("game_sessions");
}
