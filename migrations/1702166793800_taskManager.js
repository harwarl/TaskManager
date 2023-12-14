/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    user_id: "id",
    firstname: { type: "varchar(200)" },
    lastname: { type: "varchar(200)" },
    username: { type: "varchar(200)", notNull: true },
    email: { type: "varchar(200)", notNull: true },
    password: { type: "varchar(500)", notNull: true },
    createdat: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("tasks", {
    task_id: "id",
    title: { type: "varchar(200)", notNull: true },
    description: { type: "varchar(3000)", notNull: true },
    status: { type: "boolean", notNull: true, default: "false" },
    due_date: { type: "timestamp", notNull: true },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
  });
  pgm.createIndex("tasks", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("tasks");
  pgm.dropTable("users");
};

exports.up = (pgm) => {
  pgm.addColumns("tasks", {
    createdat: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
