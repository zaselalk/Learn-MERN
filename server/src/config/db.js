import mongoose from "mongoose";

// One place that knows how to connect to the database.
export async function connectDB(uri) {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}
