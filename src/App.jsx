import Post from "./components/Post.jsx";

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60_000).toISOString();

// Hardcoded for now. In 03 these move into state.
const posts = [
  { id: 1, text: "Free pizza at the CS club, 4pm", reactions: { fire: 58, laugh: 6, sad: 1 }, createdAt: minutesAgo(5) },
  { id: 2, text: "Library Wi-Fi is finally fast!", reactions: { fire: 31, laugh: 2, sad: 0 }, createdAt: minutesAgo(42) },
  { id: 3, text: "Who else is stuck on Lab 3?", reactions: { fire: 12, laugh: 4, sad: 9 }, createdAt: minutesAgo(180) },
];

export default function App() {
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
        <section className="feed">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              text={post.text}
              reactions={post.reactions}
              createdAt={post.createdAt}
            />
          ))}
        </section>
      </main>
    </>
  );
}
