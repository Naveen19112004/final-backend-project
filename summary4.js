// // ✅ Lecture 11: File Uploading

// /*
// 📌 MAIN GOAL:
// → Upload PDFs, images, videos, etc.

// 🔸 In frontend:
//   - No actual upload logic.
//   - You just create a <form> and browse file from your file manager.
//   - Nothing is sent yet. You only select file.

// 🔸 In Express (backend):
//   - Express itself does NOT handle file uploads directly.
//   - File handling is done on the server OR through third-party services (like AWS, Cloudinary).
//   - So we say → upload it to AWS, S3, Cloudinary, etc.
// */

// // ✅ Strategy:
// // 1. Use a middleware (Multer) to handle file upload from user to local server.
// // 2. Then → Upload that local file to Cloudinary.
// // 3. Finally → Delete the temp file from the local server.

// // ✅ Why a separate file uploader utility?
// // - We keep file upload logic **clean**, **reusable**, and **standardized**
// // - So, create a `utils/cloudinary.js` file
// // - Inject it as middleware wherever needed: "MW = meet me before going"

// // ✅ Common Service: Cloudinary
// /*
// Cloudinary is used because:
//   - It aligns, crops, handles colors, videos, PDFs
//   - Internally uses AWS
//   - We use their free plan

// 🔁 Recap:
//   - When you upload, Cloudinary gives you: 
//     → 1. Public URL (secure)
//     → 2. File metadata

// 🔧 Installation:
//   - `npm i cloudinary`      // Cloudinary SDK
//   - `npm i multer`          // Middleware for file uploads

// 🧠 Between multer and express-fileupload:
//   - Both do the same work, but in this lecture → we use multer.
// */

// // ✅ Cloudinary Setup (in `utils/cloudinary.js`)
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// // 📌 Setup config (IMPORTANT: Put credentials in .env)
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // ✅ File Upload Function
// const uploadFileToCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     // File exists → upload to cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     // ✅ File uploaded successfully
//     // 🔥 REMOVE file from local server now (cleanup)
//     fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     // ❌ On error → remove temp file to save storage
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// module.exports = { uploadFileToCloudinary };
// ✅ Multer Setup – middlewares/multer.middleware.js
// js
// Copy code
// const multer = require("multer");
// const path = require("path");

// // ✅ Store file temporarily on server (disk storage)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "temp/"); // store in a temp folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
// ✅ Usage in Route – routes/file.routes.js
// js
// Copy code
// const express = require("express");
// const router = express.Router();

// const upload = require("../middlewares/multer.middleware");
// const { uploadFileToCloudinary } = require("../utils/cloudinary");

// // 🔁 File upload API
// router.post("/upload", upload.single("file"), async (req, res) => {
//   const localPath = req.file?.path;

//   if (!localPath) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const cloudUpload = await uploadFileToCloudinary(localPath);

//   if (!cloudUpload) {
//     return res.status(500).json({ message: "File upload failed" });
//   }

//   return res.status(200).json({
//     message: "File uploaded successfully",
//     url: cloudUpload.secure_url,
//   });
// });

// module.exports = router;
// ✅ Notes Summary (💯 As Per Your Style)
// /*
// 🔁 Why 2 steps?

// We cannot directly upload from multer to Cloudinary (for security, temp checks, previewing).

// Production-grade apps always:

// Upload to local (temp)

// Then upload to cloud

// Then delete from local

// 🧠 Utility Folder:

// Contains cloudinary.js

// Accepts a local file path and uploads to cloud

// Cleans up the local file (unlinkSync)

// 🧠 Middleware:

// Multer handles multipart/form-data

// Stores file temporarily using diskStorage()

// ⚠️ Don’t forget:

// Add .env file with:
// CLOUD_NAME=
// CLOUD_API_KEY=
// CLOUD_API_SECRET=

// Make a temp/ folder to store local uploads temporarily
// */
// import {v2 as cloudinary} from "clodinary"
// import fs from "fs"
 
// if the file has uploaded to the cloudinary fromt he local server then we can remove it from the local server 

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });
// in .env folder i need to put 
// cloud_name=chaiaurcode
// api_key =1234567654321
// api_secret=blow9vFq
// inalso sample .env 

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });
// this configuration give you permission to upload the finally;es 


// otherwise how will it know which account is logging in,
// wwhat is the username, so this is what we do here 

// const uploadoncloudinary=async(localfilepath)=>{
//     try{
// //if localfilepath is not there then return null
//       if(!localfilepath)return null;
//       //upload the file on cloudinary 
//      const response = await cloudinary.uploader.upload(localfilepath,{
//         //options
//         resource_type:"auto";
//       })
//       //file has uploaded hass been ulploaded successfully thren 
//       console.log("file is uploaded on cloudinary ",response.url);
//       return response;
//     }
//     catch(error){
//        fs.unlinkSync(localfilepath)//remove the locally saved temparary file as the upload operation got failed 
//        return null;
//     }
// }export {uploadoncloudinary}
// // ✅ Multer Middleware for File Uploads

// import multer from "multer"; // required to use multer

// /*
// 📌 Why this middleware?
// - Multer is used because normal Express can't read files in multipart/form-data.
// - This middleware configures multer to:
//   1. Take files from request body
//   2. Store them temporarily on disk
//   3. Make them accessible inside `req.file` or `req.files`
// */

// // ✅ Configure Storage Engine for Multer
// const storage = multer.diskStorage({
//   // 👉 destination: where to store file temporarily
//   destination: function (req, file, cb) {
//     // folder: ./public/temp (must exist or create manually)
//     cb(null, "./public/temp");
//   },

//   // 👉 filename: how to name the file (can rename or keep original)
//   filename: function (req, file, cb) {
//     // 🔸 Create a unique suffix so the file name doesn't conflict
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     // Final filename = fieldName-uniqueSuffix
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// /*
// 🧠 Request Info:
// - `req` already contains form data (from client)
// - With this multer config, we can access:
//     req.file (for single)
//     req.files (for multiple)
// - json + file → handled easily by multer

// 💡 cb = callback → tells multer what to do next
// */

// // ✅ Create Multer Upload Middleware
// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // optional: max size = 10MB
//   },
// });
