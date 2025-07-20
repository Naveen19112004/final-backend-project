// import {Router} from "express";
// import { registerUser } from '../controllers/user.controller.js';
// const router=Router()
// router.route("/register").post(registerUser)
// //router.route("/login").post(login)
// export default router;

// src/routes/user.routes.js
// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";

// const router = Router();

// // Register route
// router.post("/register", registerUser);

// export default router;

import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.mw.js"; // adjust path if needed

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;

