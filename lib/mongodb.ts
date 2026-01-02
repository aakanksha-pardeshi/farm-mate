import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://task-manager:AnaqAZxx0BthhQfL@cluster0-shard-00-00.m6vbg.mongodb.net:27017,cluster0-shard-00-01.m6vbg.mongodb.net:27017,cluster0-shard-00-02.m6vbg.mongodb.net:27017/test?ssl=true&replicaSet=atlas-bmr3br-shard-0&authSource=admin&retryWrites=true&w=majority';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
