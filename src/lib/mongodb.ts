
import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}
// Load environment variables from .env file
const MONGODB_URI = process.env.MONGODB_URI as string;
//const MONGODB_NAME = process.env.MONGODB_NAME as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");
//if (!MONGODB_NAME) throw new Error("MONGODB_NAME not defined");

// Database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {    
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;