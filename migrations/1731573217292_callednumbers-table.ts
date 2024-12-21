import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table called_numbers {
//   id int [pk, increment]
//   session_id int [ref: > game_sessions.id] // FK referencing game_session that the called number belongs to
//   number int // The called number (1 to N) we can do 1 to 75
//   called_at timestamp
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("called_numbers", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    room_id: {
      type: "integer",
    },
    number: {
      type: "integer", // called number 1 to 75
    },
    called_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("called_numbers");
}
