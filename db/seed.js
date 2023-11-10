const db = require("./db");

const drop_table = `DROP TABLE users;`;

const create_users = `CREATE TABLE users (
    id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    mail text NOT NULL,
    phoneNumber text NOT NULL,
    password text NOT NULL
)`;

(async () => {
  await db.query(drop_table, []);
  await db.query(create_users, []);
  process.exit(0);
})();