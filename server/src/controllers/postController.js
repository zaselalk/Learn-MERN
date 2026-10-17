import mongoose from "mongoose";
import Post from "../models/Post.js";

const REACTIONS = ["fire", "laugh", "sad"];

// Controllers hold the logic for each route: read the request, talk to the model, send a response.

// GET /api/posts → list all posts, newest first
export async function getPosts(req, res) {
  const posts = await Post.find().sort({ createdAt: -1, _id: -1 });
  res.json(posts);
}

// POST /api/posts → create a post from { text }
export async function createPost(req, res) {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  const post = await Post.create({ text });
  res.status(201).json(post);
}

// PATCH /api/posts/:id/react → add a reaction from { type }
export async function reactToPost(req, res) {
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
}
