# ECS 153 Final Project Design Notes

## Team: S20-lxrn

### Interaction

- Transactions: web socket / http-rest (?)
- Flow:

  1) Sender sends message + recipient to the server
  2) Server will drop message in a 'box' for the recipient
  3) Recipient can check in with the server to see if they have any pending messages and retrieve them
  4) Recipient can then reply in the same fashion as the sender

- Encryption: Users will have both a public  and private key; the public key will be given to the server upon registration. When a client wants to send a message, the server will give them the recipient's public key, this way only the recipient can decrypt their message.

### Server

- Language: Javascript
- Database: SQLite
- Steps
  1. TBD

### Client

- Language: C++
- Steps
  1. Ask if user is retrieving or sending messages
  2. Require username/password login\
    a. Success: Proceed\
    b. Fail: try again or register username
  3. By now user should be logged in/authenticated\
    a. For retrieving, contact server and retrieve pending messages\
    b. For sending, enter recipient username and message, send to server
  4. Receive response from server\
    a. For retrieving, display list to user and allow reading\
    b. For sending, confirm success
  5. Conclude task\
    a. For retrieving, compile read messages and notify server for deletion\
    b. For sending, notify user of confirmation
  6. Prompt user to logout or return to task choice\
    a. Task choice = step 1 without needing to reauthenticate

---

[Link to this file](design_notes.md)
