import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validate fields
  if ([fullName, email, username, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are mandatory");
  }

  // Check if user exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Access uploaded files
  const avatarLocalPath = req?.files?.avatar?.[0]?.path;
  //const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;
  let coverImageLocalPath;

  if (
  req.files &&
  Array.isArray(req.files.coverImage) &&
  req.files.coverImage.length > 0
) {
  coverImageLocalPath = req.files.coverImage[0].path;
}

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar and coverImage to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("Avatar upload response:", avatar);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;
  if (coverImageLocalPath) console.log("Cover image upload response:", coverImage);

  if (!avatar?.url) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Create user in DB
  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong registering the user");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "Registration successful"));
});

export { registerUser };
