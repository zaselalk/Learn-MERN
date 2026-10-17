import mongoose from "mongoose";

// A schema describes the shape of each post.
const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    reactions: {
      fire: { type: Number, default: 0 },
      laugh: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
    },
  },
  { timestamps: true } // adds createdAt and updatedAt for us
);

// The model gives us Post.find(), Post.create(), Post.findByIdAndUpdate()...
const Post = mongoose.model("Post", postSchema);

export default Post;
