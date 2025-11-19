import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable.');
}

// Cache the connection across lambda invocations
let cached = globalThis._mongoClientPromise;

async function connectDB() {
  if (cached) return cached;
  const opts = {
    // mongoose modern defaults; keep for clarity
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  cached = mongoose.connect(MONGO_URI, opts).then((m) => m.connection);
  globalThis._mongoClientPromise = cached;
  return cached;
}

export default connectDB;