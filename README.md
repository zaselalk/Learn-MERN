# Uni Feed

An anonymous campus feed: post a short message, and everyone else reacts with 🔥 😂 or 😢.

> ### You are on `06-mongodb`
>
> **Set up the database:** copy `server/.env.example` to `server/.env` and set `MONGODB_URI` to your local MongoDB or your Atlas connection string.
>
> **Run it** in two terminals:
> ```bash
> # terminal 1: the API
> cd server
> npm install
> npm run dev
> ```
> ```bash
> # terminal 2: the React app (from the repo root)
> npm install
> npm run dev
> ```
> Then open http://localhost:5173
>
> **What to notice:** `server/models/Post.js` defines a Mongoose schema and model, and the routes in `server/index.js` use `Post.find`, `Post.create` and `Post.findByIdAndUpdate` instead of an array. Restart the server: your posts are still there.
>
> **Live demo from phones:** the React dev server now runs with `--host`, so it prints a *Network* URL like `http://192.168.1.20:5173`. Phones on the same Wi-Fi can open it and post. If they can’t connect, allow Node through the laptop’s firewall.
>
> **Mac users:** if port 5000 is busy, turn off *AirPlay Receiver* in System Settings → General → AirDrop & Handoff.
>
> 🎉 That’s the full MERN stack: MongoDB, Express, React, Node.
>
> **Bonus:** `git checkout 07-folder-structure` to see the same app organised the way real projects are.

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
