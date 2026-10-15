import express from "express";

const app = express();
app.use(express.json()); // lets us read JSON request bodies (req.body)

const REACTIONS = ["fire", "laugh", "sad"];

// Posts live in memory, in a plain array.
// Restart the server and they're gone.
// We call the id "_id" because that's what MongoDB will use later.
let nextId = 1;
const posts = [];

function createPost(text) {
  const post = {
    _id: String(nextId++),
    text,
    reactions: { fire: 0, laugh: 0, sad: 0 },
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post); // newest first
  return post;
}

createPost("Who else is stuck on Lab 3?");
createPost("Library Wi-Fi is finally fast!");
createPost("Free pizza at the CS club, 4pm");

// GET /api/posts → list all posts, newest first
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// POST /api/posts → create a post from { text }
app.post("/api/posts", (req, res) => {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  res.status(201).json(createPost(text));
});

// PATCH /api/posts/:id/react → add a reaction from { type }
app.patch("/api/posts/:id/react", (req, res) => {
  const { type } = req.body;
  if (!REACTIONS.includes(type)) {
    return res.status(400).json({ error: "type must be fire, laugh or sad" });
  }

  const post = posts.find((p) => p._id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }

  post.reactions[type] += 1;
  res.json(post);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Uni Feed API running on http://localhost:${PORT}`);
});
