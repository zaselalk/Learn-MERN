import { useState } from "react";
import { MAX_POST_LENGTH } from "../constants/reactions.js";

export default function PostForm({ onPost }) {
  // The text box is "controlled": React state holds what you type.
  const [text, setText] = useState("");
  const remaining = MAX_POST_LENGTH - text.length;

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page
    if (!text.trim()) return;
    onPost(text.trim());
    setText("");
  }

  // Ctrl+Enter (or Cmd+Enter on a Mac) posts straight away
  function handleKeyDown(event) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleSubmit(event);
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-row">
        <div className="avatar">🙂</div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={MAX_POST_LENGTH}
          placeholder="What’s happening on campus?"
        />
      </div>
      <div className="composer-footer">
        <span className={remaining <= 20 ? "counter warn" : "counter"}>{remaining}</span>
        <button type="submit" className="btn-post" disabled={!text.trim()}>
          Post
        </button>
      </div>
    </form>
  );
}
