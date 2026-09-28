import mongoose from "mongoose";

function getMongoUri() {
  // Support both common variable names so local and Render configs work.
  let uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";

  // Be forgiving of accidental whitespace or wrapping quotes in hosting dashboards.
  uri = uri.trim().replace(/^['"]|['"]$/g, "");

  // Catch the common Render mistake where the whole `MONGODB_URI=...`
  // assignment is pasted into the Value field.
  uri = uri.replace(/^(?:MONGODB_URI|MONGO_URI)\s*=\s*/i, "").trim();

  if (!uri) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "MongoDB URI is missing. Set MONGODB_URI (recommended) or MONGO_URI in Render Environment."
      );
    }

    return "mongodb://127.0.0.1:27017/clinicDB";
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      'Invalid MongoDB URI. It must start with "mongodb://" or "mongodb+srv://".'
    );
  }

  return uri;
}

export async function connectDB() {
  const uri = getMongoUri();

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}
