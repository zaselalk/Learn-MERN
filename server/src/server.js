import app from "./app.js";
import { connectDB } from "./config/db.js";
import { MONGODB_URI, PORT } from "./config/env.js";
import { seedPosts } from "./utils/seed.js";

// server.js is the entry point: connect to the database, then start listening.
async function start() {
  await connectDB(MONGODB_URI);
  await seedPosts();

  // Listening on all network interfaces lets phones on the same Wi-Fi connect
  app.listen(PORT, () => {
    console.log(`Uni Feed API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Could not start the server:", err.message);
  console.error("Check MONGODB_URI in server/.env (see .env.example)");
  process.exit(1);
});
