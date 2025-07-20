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

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import connectDB from './db/index.js'; // Your DB connection file
import { app } from './app.js'; // Import the app instance from app.js

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Application failed to start:", err);
  }
})();


// import { app } from './app.js';

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// import express from  'express';
// const app = express();


// app.get('/',(req,res)=>{
//     res.send('hjk');
// })


// app.listen(5000,()=>{
//     console.log(`port is running at 5000`)
// })