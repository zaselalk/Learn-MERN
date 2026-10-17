import { useEffect, useState } from "react";
import * as postsApi from "../api/posts.js";

// A custom hook: all the posts state and logic in one reusable place.
// Components just call usePosts() and get data plus actions back.
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    postsApi
      .getPosts()
      .then(setPosts)
      .catch(() => setError("Can’t reach the API. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  async function addPost(text) {
    const newPost = await postsApi.createPost(text);
    setPosts((current) => [newPost, ...current]);
  }

  async function react(id, type) {
    const updated = await postsApi.reactToPost(id, type);
    setPosts((current) => current.map((post) => (post._id === id ? updated : post)));
  }

  return { posts, loading, error, addPost, react };
}
