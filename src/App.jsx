import { useEffect, useState } from "react";
import Post from "./components/Post.jsx";
import PostForm from "./components/PostForm.jsx";

// Use the same host the page came from, so phones on the Wi-Fi
// (opening http://<laptop-IP>:5173) reach the laptop's API, not their own.
const API_URL = `http://${window.location.hostname}:5000/api/posts`;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the posts from the API once, when the app first appears.
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Can’t reach the API. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  async function addPost(text) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newPost = await res.json();
    setPosts((current) => [newPost, ...current]);
  }

  async function react(id, type) {
    const res = await fetch(`${API_URL}/${id}/react`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    const updated = await res.json();
    setPosts((current) => current.map((post) => (post._id === id ? updated : post)));
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
          {loading && (
            <>
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
            </>
          )}
          {error && <p className="empty">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="empty">No posts yet. Be the first! ✨</p>
          )}
          {posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              text={post.text}
              reactions={post.reactions}
              createdAt={post.createdAt}
              onReact={(type) => react(post._id, type)}
            />
          ))}
        </section>
      </main>
    </>
  );
}
