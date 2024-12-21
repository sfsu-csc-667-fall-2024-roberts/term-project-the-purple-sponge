import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// Table gamerooms {
//   id integer [pk, increment]
//   room_name varchar
//   is_global boolean
//   is_active boolean
//   host_user_id integer
//   max_players integer [not null]
//   timer_speed integer [not null]
//   created_at timestamp
// }
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("gamerooms", {
    id: "id", // shorthand for { type 'serial', primaryKey: true }
    room_name: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    is_global: {
      type: "boolean",
    },
    is_active: {
      type: "boolean",
    },
    host_user_id: {
      type: "integer",
    },
    max_players: {
      type: "integer",
      notNull: true,
    },
    timer_speed: {
      type: "integer",
      notNull: true,
    },
    timer_start: {
      type: "integer",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("gamerooms");
}
