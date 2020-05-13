# ECS 153 Final Project Design Notes

## Team: S20-lxrn

### Server

- Language: Javascript
- Database: SQLite

### Client

- Language: C++

### Interaction

- Transactions: web socket / http-rest (?)
- Flow:

  1) Sender sends message + recipient to the server
  2) Server will drop message in a 'box' for the recipient
  3) Recipient can check in with the server to see if they have any pending messages and retrieve them
  4) Recipient can then reply in the same fashion as the sender

- Encryption: Users will have both a public  and private key; the public key will be given to the server upon registration. When a client wants to send a message, the server will give them the recipient's public key, this way only the recipient can decrypt their message.

---

[Link to this file](design_notes.md)
