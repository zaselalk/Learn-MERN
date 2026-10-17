import "dotenv/config"; // reads server/.env into process.env

// Every setting the server needs, read once, with sensible defaults.
export const PORT = Number(process.env.PORT) || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/unifeed";
