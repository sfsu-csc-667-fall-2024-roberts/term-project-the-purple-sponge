import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table lk_users_gamerooms {
//   id integer [pk, increment]
//   user_id integer [ref: > users.id]
//   gameroom_id integer [ref: > gamerooms.id]
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("lk_users_gamerooms", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    user_id: {
      type: "integer", // special type for foreign keys to reference an id
      references: "users",
      unique: true
    },
    game_room_id: {
      type: "integer",
      references: "gamerooms",
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("lk_users_gamerooms");
}
