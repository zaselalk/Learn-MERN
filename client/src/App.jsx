import Header from "./components/Header.jsx";
import PostForm from "./components/PostForm.jsx";
import Feed from "./components/Feed.jsx";
import { usePosts } from "./hooks/usePosts.js";

// App just puts the pieces together. The data logic lives in usePosts,
// the network calls in api/posts.js, and the UI in components/.
export default function App() {
  const { posts, loading, error, addPost, react } = usePosts();

  return (
    <>
      <Header />
      <main className="app">
        <PostForm onPost={addPost} />
        <Feed posts={posts} loading={loading} error={error} onReact={react} />
      </main>
    </>
  );
}
