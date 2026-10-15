// Our "data": a plain JavaScript array.
// It only lives in this browser tab, so a refresh resets it.
const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60_000).toISOString();

const posts = [
  { id: 1, text: "Free pizza at the CS club, 4pm", reactions: { fire: 58, laugh: 6, sad: 1 }, createdAt: minutesAgo(5) },
  { id: 2, text: "Library Wi-Fi is finally fast!", reactions: { fire: 31, laugh: 2, sad: 0 }, createdAt: minutesAgo(42) },
  { id: 3, text: "Who else is stuck on Lab 3?", reactions: { fire: 12, laugh: 4, sad: 9 }, createdAt: minutesAgo(180) },
];

const MAX_LENGTH = 200;
const REACTIONS = [
  { type: "fire", emoji: "🔥" },
  { type: "laugh", emoji: "😂" },
  { type: "sad", emoji: "😢" },
];
const ANIMALS = [
  ["🦊", "Fox"], ["🐼", "Panda"], ["🦉", "Owl"], ["🐨", "Koala"], ["🐯", "Tiger"],
  ["🐸", "Frog"], ["🐙", "Octopus"], ["🦄", "Unicorn"], ["🐧", "Penguin"], ["🐢", "Turtle"],
  ["🐻", "Bear"], ["🐰", "Rabbit"], ["🦁", "Lion"], ["🐵", "Monkey"], ["🐳", "Whale"],
  ["🦋", "Butterfly"], ["🐝", "Bee"], ["🦔", "Hedgehog"], ["🦒", "Giraffe"], ["🐬", "Dolphin"],
];

// Posts are anonymous, so each one gets a fun animal based on its id.
function avatarFor(id) {
  let hash = 0;
  for (const char of String(id)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const [emoji, animal] = ANIMALS[hash % ANIMALS.length];
  return { emoji, name: `Anonymous ${animal}`, hue: (hash * 137) % 360 };
}

// "just now", "5m", "2h", "3d"
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

const feed = document.querySelector("#feed");
const form = document.querySelector("#post-form");
const input = document.querySelector("#post-text");
const counter = document.querySelector("#counter");
const postButton = document.querySelector("#post-button");

// Build the DOM for one post, by hand. Look how much code this is!
function createPostElement(post) {
  const author = avatarFor(post.id);

  const card = document.createElement("article");
  card.className = "post";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.setProperty("--hue", author.hue);
  avatar.textContent = author.emoji;
  card.append(avatar);

  const body = document.createElement("div");
  body.className = "post-body";

  const meta = document.createElement("div");
  meta.className = "post-meta";
  const name = document.createElement("span");
  name.className = "post-author";
  name.textContent = author.name;
  const time = document.createElement("span");
  time.className = "post-time";
  time.textContent = `· ${timeAgo(post.createdAt)}`;
  meta.append(name, time);

  const text = document.createElement("p");
  text.className = "post-text";
  text.textContent = post.text;

  const reactions = document.createElement("div");
  reactions.className = "reactions";
  for (const { type, emoji } of REACTIONS) {
    const button = document.createElement("button");
    button.className = "reaction";
    button.innerHTML = `<span class="emoji">${emoji}</span>${post.reactions[type]}`;
    button.addEventListener("click", () => {
      post.reactions[type] += 1;
      renderFeed(); // we must remember to redraw ourselves
    });
    reactions.append(button);
  }

  body.append(meta, text, reactions);
  card.append(body);
  return card;
}

// Throw away the old feed and rebuild it from the array.
function renderFeed() {
  feed.innerHTML = "";

  if (posts.length === 0) {
    feed.innerHTML = '<p class="empty">No posts yet. Be the first! ✨</p>';
    return;
  }

  for (const post of posts) {
    feed.append(createPostElement(post));
  }
}

// Keep the counter and the Post button in sync with the text box, by hand too.
function updateComposer() {
  const remaining = MAX_LENGTH - input.value.length;
  counter.textContent = remaining;
  counter.className = remaining <= 20 ? "counter warn" : "counter";
  postButton.disabled = !input.value.trim();
}

function addPost() {
  const text = input.value.trim();
  if (!text) return;

  posts.unshift({
    id: Date.now(),
    text,
    reactions: { fire: 0, laugh: 0, sad: 0 },
    createdAt: new Date().toISOString(),
  });
  input.value = "";
  updateComposer();
  renderFeed();
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser reloading the page
  addPost();
});

input.addEventListener("input", updateComposer);

// Ctrl+Enter (or Cmd+Enter on a Mac) posts straight away
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    addPost();
  }
});

renderFeed();
