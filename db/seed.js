const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "projekt2_web2",
  password: "bazepodataka",
  port: 5432,
});

const drop_tables = `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`;

const sql_create_users = `CREATE TABLE users (
    id int  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    mail text NOT NULL,
    phoneNumber text NOT NULL,
    password text NOT NULL
)`;

const sql_create_team = `CREATE TABLE team (
    teamid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
)`;

const sql_insert_users = `INSERT INTO users (name, mail, phoneNumber, password) VALUES 
    ('Mate', 'matemali@gmail.com', '0945666543', 'sigurnalozinka')`;

const sql_insert_team = `INSERT INTO team (name) VALUES ('Prvi'), ('Drugi'), ('Treci')`;

//let table_names = ["users", "team"];

let tables = [sql_create_users, sql_create_team];

let table_data = [sql_insert_users, sql_insert_team];

(async () => {
  await pool.query(drop_tables, []);
  for (let i = 0; i < tables.length; i++) {
    await pool.query(tables[i], []);
    if (table_data[i] !== undefined) {
      await pool.query(table_data[i], []);
    }
  }
  await pool.end();
})();
