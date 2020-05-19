// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/lxrnDB.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it
db.serialize(() => {
  if (!exists) {
    db.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, uname TEXT NOT NULL UNIQUE, pw TEXT NOT NULL)");
    console.log("New table Users created!");

    db.run("CREATE TABLE Auth (id INTEGER PRIMARY KEY AUTOINCREMENT, uname TEXT NOT NULL UNIQUE, auth_token TEXT NOT NULL, expires TEXT NOT NULL)");
    console.log("New table Auth created!");

    db.run("CREATE TABLE Drops (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT NOT NULL, dest TEXT NOT NULL, msg TEXT NOT NULL, sent TEXT NOT NULL, expires TEXT NOT NULL)");
    console.log("New table Drops created!");

  } else {
    console.log("Database ready to go!");
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  // default webpage delivery nothing here for us
  res.status(404).json({ error: 'empty endpoint' });
});

/* db example
db.all("SELECT * from Table", (err, rows) => { response.send(JSON.stringify(rows)); });
*/

app.post("/v1/register", (req, res) => {
  // call to register a new account
  // req.body.username req.body.password
  console.log("Received request to '/v1/register': ", req);

  res.status(501).json({ error: 'under construction' });
});

app.post("/v1/login", (req, res) => {
  // call to log into an account
  // req.body.username req.body.password
  console.log("Received request to '/v1/login': ", req.body);

  const cliUser = req.body.username;
  const cliPw = req.body.password;

  db.each(
      "SELECT * from Users",
      (err, row) => {
        if (row.uname === cliUser) {
          console.log("Found a match for username", cliUser);

          // check if passwords match TODO: handle encryption methods
          if (row.pw === cliPw) {
            console.log("Password record matches as well");

            // TODO: generate tokens & insert to table
            let auth_token = "auth under construction";

            res.status(200).json({ auth_token: auth_token });
            console.log("Returned 200 to client with token:", auth_token);
          } else {
            console.log("Password mismatch");

            res.status(401).json({ error: 'username/password mismatch' });
            console.log("Returned 401 to client with error: username/password mismatch");
          }
        }

      },
      err => {
        if (err) {
          console.log("Request encountered an error!");
          // res.send({ message: "error!" });
          res.status(500).json({ error: 'server error' });
        }
      }
    );
});

app.post("/v1/send", (req, res) => {
  // call to send a message
  // req.body.auth_token, req.body.msg, (optional)req.body.expiration
  console.log("Received request to '/v1/send': ", req);

  res.status(501).json({ error: 'under construction' });
});

app.get("/v1/receive", (req, res) => {
  // call to receive messages for user with auth_token in field
  // req.body.auth_token
  console.log("Received request to '/v1/receive': ", req);

  res.status(501).json({ error: 'under construction' });

  // 1. check if auth_token is valid and get the corresponding username

  // 2. find messages in the database for this user
});

// db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//   if (row) {
//     console.log(`deleted row ${row.id}`);
//   }
// });

app.post("/v1/delete", (req, res) => {
  // call to delete messages
  // req.body.auth_token, req.body.src, req.body.dest, req.body.sent
  console.log("Received request to '/v1/delete': ", req);

  res.status(501).json({ error: 'under construction' });
});

app.post("/v1/logout", (req, res) => {
  // call to log out a user
  // req.body.auth_token, req.body.username
  console.log("Received request to '/v1/logout': ", req);

  res.status(501).json({ error: 'under construction' });
});

////////////////////////////////////////////////////////////////////////////////////////

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
