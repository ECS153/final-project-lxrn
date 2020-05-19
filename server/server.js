// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const crypto = require("crypto");

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

///////////////////////////
//  INITIALIZE DATABASE  //
///////////////////////////

// if ./.data/sqlite.db does not exist, create it
db.serialize(() => {
  if (!exists) {
    db.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, uname TEXT NOT NULL UNIQUE, pw TEXT NOT NULL)", error => { if (error) { console.log("User table failed", error.message); } else { console.log("User table created"); }});

    db.run("CREATE TABLE Auth (id INTEGER PRIMARY KEY AUTOINCREMENT, uname TEXT NOT NULL UNIQUE, auth_token TEXT NOT NULL, expires TEXT DEFAULT (datetime('now', '+1 hour')) NOT NULL CHECK(expires > datetime('now')))", error => { if (error) { console.log("Auth table failed", error.message); } else { console.log("Auth table created"); }});

    db.run("CREATE TABLE Drops (id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT NOT NULL, dest TEXT NOT NULL, msg TEXT NOT NULL, sent TEXT DEFAULT (datetime('now')) NOT NULL, expires TEXT DEFAULT (datetime('now', '+1 month')) NOT NULL CHECK(expires > datetime('now')))", error => { if (error) { console.log("Drops table failed", error.message); } else { console.log("Drops table created"); }});

    // DEBUGGING INITIALIZE DATABASE WITH SOME VALUES
    db.run("INSERT INTO Users (uname, pw) VALUES (?, ?)", 'TestName', encrypt('testpw'), error => { if (error) { console.log("Debug1 failed", error.message); } else { console.log("Debug1 entered"); }});

    db.run("INSERT INTO Users (uname, pw) VALUES (?, ?)", 'TestName2', encrypt('wptset'), error => { if (error) { console.log("Debug2 failed", error.message); } else { console.log("Debug2 entered"); }});

    db.run("INSERT INTO Auth (uname, auth_token) VALUES (?, ?)", 'TestName', crypto.randomBytes(20).toString('hex'), error => { if (error) { console.log("Debug3 failed", error.message); } else { console.log("Debug3 entered"); }});

    db.run("INSERT INTO Drops (src, dest, msg) VALUES (?, ?, ?)", 'TestName', 'TestName2', 'test message here', error => { if (error) { console.log("Debug4 failed", error.message); } else { console.log("Debug4 entered"); }});

  } else {
    console.log("Database ready to go!");
  }
});

/////////////////
//  ENDPOINTS  //
/////////////////

app.post("/v1/register", (req, res) => {
  // call to register a new account
  // req.body.username req.body.password
  console.log("Received request to '/v1/register': ", req.body);

  const cliUser = req.body.username;
  const cliPw = req.body.password;

  let sql = "INSERT INTO Users (uname, pw) VALUES (?, ?)";
  db.run(sql, cliUser, encrypt(cliPw), err => {
    if (err) {
      res.status(401).json({ error: 'username taken' });
      console.log("Respond 401 due to taken username");
      return;
    } else {
      let token = crypto.randomBytes(20).toString('hex');
      console.log("User registered; generated token:", token);

      let sql = "INSERT INTO Auth (uname, auth_token) VALUES (?, ?)";
      db.run(sql, cliUser, token, error => {
        if (error) {
          res.status(500).json({ error: 'server error' });
          console.log("Respond 500 due to INSERT error:", error.message);
          return;

        } else {
          res.status(200).json({ auth_token: token });
          console.log("Respond 200 with token:", token);
          return;
        }
      });
    }
  })
});

app.post("/v1/login", (req, res) => {
  // call to log into an account
  // req.body.username req.body.password
  console.log("Received request to '/v1/login': ", req.body);

  const cliUser = req.body.username;
  const cliPw = req.body.password;


  let sql = "SELECT uname, pw FROM Users WHERE uname  = ?";
  db.get(sql, [cliUser], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'server error' });
      console.log("Respond 500 due to SELECT error:", err);
      return;

    } else {
      if (row) {
        console.log("Found a match for username", cliUser, "in row", row);

        // check if passwords match

        if (decrypt(row.pw) === cliPw) {
          let token = crypto.randomBytes(20).toString('hex');
          console.log("Passwords match; generated token:", token);

          // can only have one entry per username, insert if no current entry or replace existing
          // give token one hour for a valid login (before users must relog)
          let sql = "REPLACE INTO Auth (uname, auth_token) VALUES (?, ?)";
          db.run(sql, cliUser, token, error => {
            if (error) {
              res.status(500).json({ error: 'server error' });
              console.log("Respond 500 due to INSERT error:", error.message);
              return;

            } else {
              res.status(200).json({ auth_token: token });
              console.log("Respond 200 with token:", token);
              return;
            }
          });
        } else {
          res.status(401).json({ error: 'username/password mismatch' });
          console.log("Respond 401 due to bad password");
          return;
        }
      } else {
        res.status(401).json({ error: 'username/password mismatch' });
        console.log("Respond 401 due to bad username");
      }
    }
  });
});

app.post("/v1/send", (req, res) => {
  // call to send a message
  // req.body.auth_token, , req.body.dest, req.body.msg, (optional)req.body.expires
  console.log("Received request to '/v1/send': ", req.body);

  let cliToken = req.body.auth_token;
  let cliDest = req.body.dest;
  let cliMsg = req.body.msg;
  let cliExp = req.body.expires;

  // check authentication
  let sql = "SELECT uname FROM Auth WHERE auth_token  = ? AND expires > datetime('now')";
  db.get(sql, [cliToken], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'server error' });
      console.log("Respond 500 due to SELECT error:", err);
      return;

    } else {
      if (row) {
        let cliUser = row.uname;
        console.log("User has been authenticated:", cliUser);

        // check destination
        let sql = "SELECT uname FROM Users WHERE uname = ?";
        db.get(sql, [cliDest], (error, row) => {
          if (error) {
            res.status(500).json({ error: 'server error' });
            console.log("Respond 500 due to SELECT error:", error);
            return;

          } else {
            if (row) {
              // TODO: validate expiration

              if (cliExp) { // use the provided expiration
                console.log("using cliExp", cliExp);

                let sql = "INSERT INTO Drops (src, dest, msg, expires) VALUES (?, ?, ?, ?)";
                db.run(sql, cliUser, cliDest, cliMsg, cliExp, error => {
                  if (error) {
                    res.status(500).json({ error: 'server error' });
                    console.log("Respond 500 due to INSERT error:", error.message);
                    return;

                  } else {
                    res.status(200).json({ confirmation: 'message dropped' });
                    console.log("Respond 200 with confirmation of drop:");
                    return;
                  }
                });

              } else { // use default expiration
                let sql = "INSERT INTO Drops (src, dest, msg) VALUES (?, ?, ?)";
                db.run(sql, cliUser, cliDest, cliMsg, error => {
                  if (error) {
                    res.status(500).json({ error: 'server error' });
                    console.log("Respond 500 due to INSERT error:", error.message);
                    return;

                  } else {
                    res.status(200).json({ confirmation: 'message dropped' });
                    console.log("Respond 200 with confirmation of drop:");
                    return;
                  }
                });
              }

            } else {
              res.status(400).json({ error: 'bad destination' });
              console.log("Respond 400 due to bad destination");
              return;
            }
          }
        });

      } else {
        res.status(401).json({ error: 'bad auth_token' });
        console.log("Respond 401 due to bad auth_token");
      }
    }
  });
});

app.get("/v1/receive", (req, res) => {
  // call to receive messages for user with auth_token in field
  // req.body.auth_token
  console.log("Received request to '/v1/receive': ", req.body);

  let cliToken = req.body.auth_token;

  // check authentication
  let sql = "SELECT uname FROM Auth WHERE auth_token  = ? AND expires > datetime('now')";
  db.get(sql, [cliToken], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'server error' });
      console.log("Respond 500 due to SELECT error:", err);
      return;

    } else {
      if (row) {
        let cliUser = row.uname;
        console.log("User has been authenticated:", cliUser);

        // retrieve messages
        let sql = "SELECT src, msg, sent FROM Drops WHERE dest = ? AND expires > datetime('now')";
        db.all(sql, [cliUser], (error, row) => {
          if (error) {
            res.status(500).json({ error: 'server error' });
            console.log("Respond 500 due to SELECT error:", error);
            return;

          } else {
            if (row) {
              res.status(200).json({ messages: row });
              console.log("Respond 200 with messages", row);
              return;

            } else {
              res.status(200).json({ messages: 'none' });
              console.log("Respond 200 no messages");
              return;
            }
          }
        });

      } else {
        res.status(401).json({ error: 'bad auth_token' });
        console.log("Respond 401 due to bad auth_token");
      }
    }
  });
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

/////////////////
//  FUNCTIONS  //
/////////////////

function encrypt(text) { // example of crypto https://stackoverflow.com/a/60370205
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(process.env.CRYPTO_CIPHER_KEY, 'hex'), iv);
  let ctext = cipher.update(text);
  ctext = Buffer.concat([ctext, cipher.final()]);
  return iv.toString('hex') + ':' + ctext.toString('hex');
}

function decrypt(text) { // example of crypto https://stackoverflow.com/a/60370205
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let ctext = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(process.env.CRYPTO_CIPHER_KEY, 'hex'), iv);
  let ptext = decipher.update(ctext);
  ptext = Buffer.concat([ptext, decipher.final()]);
  return ptext.toString();
}

////////////////////////////////////////////////////////////////////////////////////////

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
