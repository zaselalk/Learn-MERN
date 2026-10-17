import Post from "../models/Post.js";

// Give a brand-new database a few posts to start with
export async function seedPosts() {
  if ((await Post.countDocuments()) > 0) return;

  await Post.create([
    { text: "Who else is stuck on Lab 3?" },
    { text: "Library Wi-Fi is finally fast!" },
    { text: "Free pizza at the CS club, 4pm" },
  ]);
  console.log("Added starter posts");
}
