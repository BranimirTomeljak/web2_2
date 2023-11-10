var express = require("express");
var bcrypt = require("bcrypt");
var xss = require("xss");
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

router.get("/send-mail", (req, res) => {
  const checkbox = req.query.checkbox;
  res.cookie("SessionID", "ovoJeSessionIDkojiNapadacMozeUkrasti", {sameSite: "none"});
  res.render("mail-register-confirm", {checkbox})
});

router.get("/after-registration", (req, res) => {
  let {input, checkbox} = req.query;
  if(checkbox=="false"){
    input = xss(input);
  }
  res.render("after-registration", { input });
});

router.get("/attacker-site", (req, res) => {
  const cookie = req.query.cookie;
  res.render("attacker-site", { cookie });
});

module.exports = router;