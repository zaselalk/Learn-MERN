import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// app.js builds the Express app: middleware, then routes, then error handling.
// It doesn't connect to the database or start listening (that's server.js),
// which keeps it easy to test.
const app = express();

app.use(cors()); // allow the React app (another origin) to call this API
app.use(express.json()); // lets us read JSON request bodies (req.body)

app.use("/api/posts", postRoutes);
// Adding a feature later? Write a new routes file and mount it here, e.g.
// app.use("/api/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
