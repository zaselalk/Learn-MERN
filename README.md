# Uni Feed

An anonymous campus feed: post a short message, and everyone else reacts with 🔥 😂 or 😢.

> ### You are on `03-react-state`
>
> **Run it:**
> ```bash
> npm install
> npm run dev
> ```
> Then open http://localhost:5173
>
> **What to notice:** `src/App.jsx` keeps the posts in `useState`. Posting (`src/components/PostForm.jsx`) and reacting create a new array with `setPosts`, and React redraws the feed for us. No DOM code anywhere.
>
> **Try this:** post something, then refresh the page. Where did your post go?
>
> **Next:** `git checkout 04-express-api`

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
