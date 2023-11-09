const db = require("./db");

const drop_tables = `DROP TABLE users;`;

const sql_create_users = `CREATE TABLE users (
    id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    mail text NOT NULL,
    phoneNumber text NOT NULL,
    password text NOT NULL
)`;

(async () => {
  await db.query(drop_tables, []);
  await db.query(sql_create_users, []);
  process.exit(0);
})();