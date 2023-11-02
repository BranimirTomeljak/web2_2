require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projekt2_web2',
  password: 'bazepodataka',
  port: 5432,
});

/*const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});*/

async function query(text, params, throwerr = false) {
  try {
    console.log(text);
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.log(err);
    if (throwerr) {
      throw err;
    }
  }
}

module.exports = {
  query: query,
  pool: pool,
};
