const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Add console.log to debug
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected ✅ ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Failed ❌ ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
