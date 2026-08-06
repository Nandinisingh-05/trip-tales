import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI inside the .env.local file"
  );
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    throw error;
  }
}