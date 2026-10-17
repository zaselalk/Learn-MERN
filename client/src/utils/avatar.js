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
