# ECS 153 Final Project Repo

## Team: S20-lxrn

- [**Proposal**](proposal.md)
- [**Milestones**](milestones.md)
- [**Design Docs**](design_docs.md)
- [**Google Drive**](https://drive.google.com/open?id=12eML4aF5LIa-0_87SsUrtAZS582Y56-y) (View Only)
- [**Final Project Slides**](https://drive.google.com/file/d/155IYmjHrW5lcW1E3oU3CJuWzdh2xjPU9/view?usp=sharing)

---

## How the proposal maps to the code

### Server

- The server receives requests with encrypted body messages, to conceal the contents from outsides. The encryption is asymmetric via public/private keys.
- The server doesn't reveal contact details:
  - When a message is received, the server autofills the sender values (not transmitted in the request).
  - When a client receives their messages they only see who sent the message (if someone obtains a message not intended for them they won't know the intended recipient).
- When a server receives a message, it simply stores it for when the recipient logs in and asks to receive their messages.
  - Messages are encrypted so that if database is broken into, messages still can't be read without access to the server's private key & algorithm
- The server doesn't forward or push to clients automatically, receiving messages happens when a user logs in to check their 'box'
  - This breaks the path between sender and receiver so that you can't follow a message from sender to server on to the recipient, only sender to server (and it's a guess about whether they're actually a sender or not).
- The server allows only one authenticated login for a user at any time, limiting where their messages get sent
  - One way to expand this project: with more time and a bigger team, this could be expanded to an ML-based prediction algorithm for expected or suspicious logins to better ensure user's security.

### Client

---

## Examples of expected request fields

Requests on the left, responses on the right

#### FetchKey
![FetchKey-example](screenshot/fetchkey-example.jpg)

#### getUserKey
![GetUserKey-example](screenshot/getUserKey-example.jpg)

#### Register
![Register-example](screenshot/register-example.jpg)

#### Login
![Login-example](screenshot/login-example.jpg)

#### Send
![Send-example-1](screenshot/send-example-1.jpg)
Without the optional `expires` field
![Send-example-2](screenshot/send-example-2.jpg)
With the optional `expires` field

#### Receive
![Receive-example](screenshot/receive-example.jpg)

#### Delete
![Delete-example](screenshot/delete-example.jpg)
![Delete-example-result](screenshot/delete-example-result.jpg)
Result of a recieve after the deletion

#### Logout
![Logout-example](screenshot/logout-example.jpg)

---

[Link to this file](README.md)
