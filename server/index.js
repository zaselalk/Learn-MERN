import "dotenv/config"; // reads MONGODB_URI from the .env file
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Post from "./models/Post.js";

const app = express();
app.use(cors()); // allow the React app (another origin) to call this API
app.use(express.json()); // lets us read JSON request bodies (req.body)

const REACTIONS = ["fire", "laugh", "sad"];

// GET /api/posts → list all posts, newest first
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1, _id: -1 });
  res.json(posts);
});

// POST /api/posts → create a post from { text }
app.post("/api/posts", async (req, res) => {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  const post = await Post.create({ text });
  res.status(201).json(post);
});

// PATCH /api/posts/:id/react → add a reaction from { type }
app.patch("/api/posts/:id/react", async (req, res) => {
  const { type } = req.body;
  if (!REACTIONS.includes(type)) {
    return res.status(400).json({ error: "type must be fire, laugh or sad" });
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: "post not found" });
  }

  // $inc adds 1 inside the database, so two clicks at once both count
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { [`reactions.${type}`]: 1 } },
    { new: true } // return the updated post, not the old one
  );
  if (!post) {
    return res.status(404).json({ error: "post not found" });
  }
  res.json(post);
});

const PORT = 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/unifeed";

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Give a brand-new database a few posts to start with
  if ((await Post.countDocuments()) === 0) {
    await Post.create([
      { text: "Who else is stuck on Lab 3?" },
      { text: "Library Wi-Fi is finally fast!" },
      { text: "Free pizza at the CS club, 4pm" },
    ]);
  }

  // Listening on all network interfaces lets phones on the same Wi-Fi connect
  app.listen(PORT, () => {
    console.log(`Uni Feed API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Could not connect to MongoDB:", err.message);
  console.error("Check MONGODB_URI in server/.env (see .env.example)");
  process.exit(1);
});
