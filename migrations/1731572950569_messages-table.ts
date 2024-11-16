import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table messages {
//   id integer [pk, increment]
//   user_id integer [ref: > users.id] // FK referencing user that owns this message
//   gameroom_id integer [ref: > gamerooms.id] // FK referencing gameroom that it belongs in
//   body varchar // Content of this message
//   created_at timestamp
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("messages", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    user_id: {
      type: "integer", // special type for foreign keys to reference an id
      references: "users",
    },
    gameroom_id: {
      type: "integer",
      references: "gamerooms",
    },
    body: {
      type: "varchar(255)", // limit messages to 255 characters
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("messages");
}
