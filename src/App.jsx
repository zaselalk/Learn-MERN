import { useState } from "react";
import Post from "./components/Post.jsx";
import PostForm from "./components/PostForm.jsx";

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60_000).toISOString();

const startingPosts = [
  { id: 1, text: "Free pizza at the CS club, 4pm", reactions: { fire: 58, laugh: 6, sad: 1 }, createdAt: minutesAgo(5) },
  { id: 2, text: "Library Wi-Fi is finally fast!", reactions: { fire: 31, laugh: 2, sad: 0 }, createdAt: minutesAgo(42) },
  { id: 3, text: "Who else is stuck on Lab 3?", reactions: { fire: 12, laugh: 4, sad: 9 }, createdAt: minutesAgo(180) },
];

export default function App() {
  // State: data that changes. When it changes, React re-renders.
  // It still only lives in this tab, so a refresh resets it.
  const [posts, setPosts] = useState(startingPosts);

  function addPost(text) {
    const newPost = {
      id: Date.now(),
      text,
      reactions: { fire: 0, laugh: 0, sad: 0 },
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]); // a new array, not posts.push()
  }

  function react(id, type) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, reactions: { ...post.reactions, [type]: post.reactions[type] + 1 } }
          : post
      )
    );
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <span className="logo">
            uni<span>feed</span>
          </span>
          <span className="tagline">Anonymous campus chatter</span>
        </div>
      </header>

      <main className="app">
        <PostForm onPost={addPost} />

        <section className="feed">
          {posts.length === 0 && <p className="empty">No posts yet. Be the first! ✨</p>}
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              text={post.text}
              reactions={post.reactions}
              createdAt={post.createdAt}
              onReact={(type) => react(post.id, type)}
            />
          ))}
        </section>
      </main>
    </>
  );
}
