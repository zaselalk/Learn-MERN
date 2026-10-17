# Uni Feed

An anonymous campus feed: post a short message, and everyone else reacts with 🔥 😂 or 😢.

> ### You are on `07-folder-structure` (bonus)
>
> Same app as `06-mongodb`, organised the way real projects are, so it can grow without turning into one giant file.
>
> **Set up the database:** copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
>
> **Run it** in two terminals:
> ```bash
> # terminal 1: the API
> cd server
> npm install
> npm run dev
> ```
> ```bash
> # terminal 2: the React app
> cd client
> npm install
> npm run dev
> ```
> Then open http://localhost:5173
>
> **Mac users:** if port 5000 is busy, turn off *AirPlay Receiver* in System Settings → General → AirDrop & Handoff.

## Folder structure

```
uni-feed/
├── client/                     React app (Vite)
│   └── src/
│       ├── api/posts.js        every call to the backend lives here
│       ├── hooks/usePosts.js   posts state + actions, reusable in any component
│       ├── components/         UI only: Header, PostForm, Feed, Post
│       ├── constants/          fixed values shared across the app
│       ├── utils/              small pure helpers (avatar, timeAgo)
│       ├── styles/index.css
│       ├── App.jsx             puts the pieces together
│       └── main.jsx            entry point
│
└── server/                     Express API
    └── src/
        ├── config/             env settings and the database connection
        ├── models/             Mongoose schemas (Post)
        ├── controllers/        the logic for each route
        ├── routes/             which URL goes to which controller
        ├── middleware/         asyncHandler, notFound, errorHandler
        ├── utils/seed.js       starter posts for an empty database
        ├── app.js              builds the Express app
        └── server.js           entry point: connect to the DB, then listen
```

### How a request flows through the server

`server.js` → `app.js` → `routes/postRoutes.js` → `controllers/postController.js` → `models/Post.js` → MongoDB

Each file has **one job**. To add a feature such as comments, you add files rather than growing existing ones:

| Layer | New file |
|---|---|
| Model | `server/src/models/Comment.js` |
| Controller | `server/src/controllers/commentController.js` |
| Routes | `server/src/routes/commentRoutes.js`, mounted in `app.js` |
| API calls | `client/src/api/comments.js` |
| State | `client/src/hooks/useComments.js` |
| UI | `client/src/components/CommentList.jsx` |

### What changed from `06-mongodb`

- **React moved into `client/`**, so the repo root just holds the two apps.
- **`App.jsx` shrank** to a few lines. Fetching moved to `api/posts.js`, state to the `usePosts` hook, and the loading/error/empty states to `Feed.jsx`.
- **`api/posts.js` checks errors:** a failed request throws with the server’s message instead of silently showing bad data.
- **`server/index.js` split up** into config, controllers, routes and middleware.
- **Errors no longer crash the server:** `asyncHandler` passes async errors to `errorHandler`, which replies with a proper status code. Unknown URLs get a JSON 404.

---

This repo is the code for the **Uni Feed MERN session**. Each step of the session is its own branch, and every branch runs on its own. If you fall behind, check out the next branch and carry on.

| Branch | Concept | What you see |
|---|---|---|
| `01-plain-html` | Browser, HTML/CSS/JS, the DOM | A feed built with plain JavaScript |
| `02-react-basics` | Components, props, lists | The feed in React with hardcoded posts |
| `03-react-state` | State, forms, events | Posting and reacting work, but refresh wipes everything |
| `04-express-api` | Node, Express, routes, JSON | `GET` / `POST` / `PATCH /api/posts`, tested in Postman |
| `05-connect-frontend` | `fetch`, CORS | React talks to the API; restarting the server still loses data |
| `06-mongodb` | MongoDB, Mongoose | Posts survive restarts; post from your phone |
| `07-folder-structure` | Project structure, layers, error handling | The same app, organised to grow |

```bash
git checkout 01-plain-html
```

## Before the session

- [Node.js](https://nodejs.org) (LTS)
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com/downloads/) (from branch 04)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account, or MongoDB installed locally (branch 06)
