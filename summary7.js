// lecture 14

// get details from the user from frontend
// but here there is no frontend part, so how do we handle that?
// we will use Postman instead of frontend to test, so no problem

// we need to send all user details as defined in user.model.js except watchHistory
// validation is needed – fields should not be empty

// check if user already exists by checking email and username

// check for uploaded images like avatar and coverImage
// upload them to cloudinary → we get back a response → contains the URL

// flow: user gives image → multer handles it → sends to cloudinary → cloudinary gives image URL back
// cloudinary will send us the public URL of the uploaded image

// create user object to be saved in MongoDB
// MongoDB works with JSON-like objects (not like SQL DB), so we create and send the object
// after creating the object, make a call to save it (User.create())

// before sending the response, remove sensitive data like password and refreshToken from the object

// check if user creation is successful
// then return the response to the frontend/Postman

// get user details from frontend using req.body
// destructure the data from req.body like this:
// const { fullname, email, username, password } = req.body;

// // for testing, add console log
// console.log("email", email);

// // open Postman and send POST request to /register
// // in body → select raw → JSON format
// // example:
// {
//   "email": "h@hc.com",
//   "password": "somepassword"
// }

// // for file handling, not done anything yet
// // go to routes

// // import multer middleware
// import { upload } from "../middlewares/multer.middlewares.js";

// // middlewares (MW) execute in between request and response

// // set up route for /register with file upload support
// router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser // controller function
// );

// // now go to user.controller.js

// // import custom error utility
// import { ApiError } from "../utils/ApiError.js";

// // check if fullname is empty
// if (fullname === "") {
//   throw new ApiError(400, "Full name is required");
// }

// // another way: check all fields together
// if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
//   throw new ApiError(400, "All fields are mandatory");
// }

// // check if user already exists in DB
// // import user model
// import { User } from "../models/user.model.js";

// // use findOne() with $or to match email or username
// const existedUser = await User.findOne({
//   $or: [{ username }, { email }],
// });

// // if user exists, throw error
// if (existedUser) {
//   throw new ApiError(409, "User with email or username already exists");
// }

// // multer handles file upload and adds it to req.files
// // if multiple files → we can access them from req.files

// // check the avatar field
// req.files?.avatar; // multer gives us array, so we access index 0
// req.files?.avatar[0]?.path; // gives us the local full path

// // multer has uploaded it to the server temporarily

// // take that path and upload to cloudinary
// // console.log the path to see and understand clearly

// const avatarLocalPath = req.files?.avatar?.[0]?.path;
// const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

// // check if avatar is properly received
// if (!avatarLocalPath) {
//   throw new ApiError(400, "Avatar file is required");
// }

// // upload to cloudinary
// import uploadOnCloudinary from "../utils/cloudinary.js";

// const avatar = await uploadOnCloudinary(avatarLocalPath);
// const coverImage = await uploadOnCloudinary(coverImageLocalPath);

// // check if avatar was uploaded
// if (!avatar) {
//   throw new ApiError(400, "Failed to upload avatar to cloudinary");
// }

// // create the user in MongoDB
// const user = await User.create({
//   fullname,
//   avatar: avatar.url,
//   coverImage: coverImage?.url || " ",
//   email,
//   password,
//   username: username.toLowerCase(),
// });

// // retrieve the created user from DB using its _id
// // in MongoDB, each document gets an _id automatically

// const createdUser = await User.findById(user._id).select("-password -refreshToken");

// // check if user was successfully retrieved
// if (!createdUser) {
//   throw new ApiError(500, "Something went wrong while registering the user");
// }

// import response utility
// import { ApiResponse } from "../utils/ApiResponse.js";

// // return the success response
// return res.status(201).json(
//   new ApiResponse(200, "Registration is successful")
// );

// Note: By default MongoDB returns all fields
// That's why we explicitly exclude password and refreshToken using `.select("-password -refreshToken")`

// Summary of flow:
// 1. Get data using req.body
// 2. Validate data
// 3. Check if user already exists
// 4. Handle file uploads using multer
// 5. Upload files to cloudinary and get URLs
// 6. Create user with all required fields
// 7. Return the created user without sensitive info
// 8. Send response using custom ApiResponse
