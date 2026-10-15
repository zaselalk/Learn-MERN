# Uni Feed

An anonymous campus feed: post a short message, and everyone else reacts with 🔥 😂 or 😢.

> ### You are on `01-plain-html`
>
> **Run it:** open `index.html` in your browser. No install needed.
>
> **What to notice:** the feed is plain HTML, CSS and JavaScript (`app.js`). Every new post or reaction means rebuilding the DOM by hand with `createElement` and `append`.
>
> **Next:** `git checkout 02-react-basics`

This repo is the code for the **Uni Feed MERN session**. Each step of the session is its own branch, and every branch runs on its own. If you fall behind, check out the next branch and carry on.

| Branch | Concept | What you see |
|---|---|---|
| `01-plain-html` | Browser, HTML/CSS/JS, the DOM | A feed built with plain JavaScript |
| `02-react-basics` | Components, props, lists | The feed in React with hardcoded posts |
| `03-react-state` | State, forms, events | Posting and reacting work, but refresh wipes everything |
| `04-express-api` | Node, Express, routes, JSON | `GET` / `POST` / `PATCH /api/posts`, tested in Postman |
| `05-connect-frontend` | `fetch`, CORS | React talks to the API; restarting the server still loses data |
| `06-mongodb` | MongoDB, Mongoose | Posts survive restarts; post from your phone |

```bash
git checkout 01-plain-html
```

## Before the session

- [Node.js](https://nodejs.org) (LTS)
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com/downloads/) (from branch 04)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account, or MongoDB installed locally (branch 06)
