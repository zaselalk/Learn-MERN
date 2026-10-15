export const REACTIONS = [
  { type: "fire", emoji: "🔥" },
  { type: "laugh", emoji: "😂" },
  { type: "sad", emoji: "😢" },
];

const ANIMALS = [
  ["🦊", "Fox"],
  ["🐼", "Panda"],
  ["🦉", "Owl"],
  ["🐨", "Koala"],
  ["🐯", "Tiger"],
  ["🐸", "Frog"],
  ["🐙", "Octopus"],
  ["🦄", "Unicorn"],
  ["🐧", "Penguin"],
  ["🐢", "Turtle"],
  ["🐻", "Bear"],
  ["🐰", "Rabbit"],
  ["🦁", "Lion"],
  ["🐵", "Monkey"],
  ["🐳", "Whale"],
  ["🦋", "Butterfly"],
  ["🐝", "Bee"],
  ["🦔", "Hedgehog"],
  ["🦒", "Giraffe"],
  ["🐬", "Dolphin"],
];

// Posts are anonymous, so each one gets a fun animal based on its id.
// The same id always gives the same animal and color.
export function avatarFor(id) {
  let hash = 0;
  for (const char of String(id)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const [emoji, animal] = ANIMALS[hash % ANIMALS.length];
  return { emoji, name: `Anonymous ${animal}`, hue: (hash * 137) % 360 };
}

// "just now", "5m", "2h", "3d"
export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}
