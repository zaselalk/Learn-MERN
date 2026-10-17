import Post from "./Post.jsx";

// The list of posts, plus what to show while loading, on error, or when empty.
export default function Feed({ posts, loading, error, onReact }) {
  if (loading) {
    return (
      <section className="feed">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </section>
    );
  }

  if (error) {
    return <p className="empty">{error}</p>;
  }

  if (posts.length === 0) {
    return <p className="empty">No posts yet. Be the first! ✨</p>;
  }

  return (
    <section className="feed">
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          text={post.text}
          reactions={post.reactions}
          createdAt={post.createdAt}
          onReact={(type) => onReact(post._id, type)}
        />
      ))}
    </section>
  );
}
