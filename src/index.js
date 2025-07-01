// index.js
//1st approach
/*import mongoose from 'mongoose';
import express from 'express';
import { DB_NAME } from './constants';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("✅ Connected to MongoDB");

    app.on("error", (error) => {
      console.error("❌ App error:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1); // exit the process on failure
  }
})();*/
// src/index.js
// 2nd approach in which connectdb is called from the src/db/index
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js'; // Path to your db file
import { DB_NAME } from './constants.js';

dotenv.config({ path: './.env' });

const app = express();

(async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });

  } catch (err) {
    console.error("❌ Application failed to start:", err);
  }
})();
