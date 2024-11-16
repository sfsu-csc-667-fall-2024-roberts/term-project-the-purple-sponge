import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table users {
//   id integer [pk, increment]
//   username varchar [not null, unique]
//   email varchar [not null, unique]
//   created_at timestamp
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    username: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("users");
}
