import mongoose from 'mongoose';

let cachedDb = null;

export async function connectToDB() {
  if (cachedDb) {
    console.log("Using cached MongoDB connection.");
    return cachedDb;
  }

  try {
    const uri = "mongodb+srv://vashistadara03_db_user:Ds79JTR7PK6i1BaS@cluster0.zox4w78.mongodb.net/test?retryWrites=true&w=majority";
    const opts = {
        bufferCommands: false, 
        serverSelectionTimeoutMS: 5000,
    };

    const connection = await mongoose.connect(uri, opts);
    cachedDb = connection;
    
    console.log("✅ MongoDB connected successfully to host:", connection.connection.host);
    
    return connection; 
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    throw err; 
  }
}

export default {
    connect: connectToDB,
};