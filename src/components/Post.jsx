import { REACTIONS, avatarFor, timeAgo } from "../utils.js";

// A component is a function that returns UI.
// Props (id, text, reactions, createdAt) are its inputs.
export default function Post({ id, text, reactions, createdAt }) {
  const author = avatarFor(id);

  return (
    <article className="post">
      <div className="avatar" style={{ "--hue": author.hue }}>
        {author.emoji}
      </div>
      <div className="post-body">
        <div className="post-meta">
          <span className="post-author">{author.name}</span>
          <span className="post-time">· {timeAgo(createdAt)}</span>
        </div>
        <p className="post-text">{text}</p>
        <div className="reactions">
          {REACTIONS.map(({ type, emoji }) => (
            <button key={type} className="reaction">
              <span className="emoji">{emoji}</span>
              {reactions[type]}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
