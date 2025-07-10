// models/user.model.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Define User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ✅ Mongoose Pre-save Hook to Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if not modified
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next();
});

// ✅ Method: Compare Passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Method: Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }
  );
};

// ✅ Method: Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    }
  );
};

// ✅ Export User Model
module.exports = mongoose.model("User", userSchema);

// // direct encryption ->not posssible
// //we need to take from mongoose like hooks in mws
// //pre->execute one after another after each individual care 
// // as soon as the data ig getting saveed just before that 
// if any user has wriitten a call or a controller 
// that save this data just before  
// just do smthg before saving the data'
// here we encrypt the password .so we have hooks for this,
//  userSchema.pre()
//  we have so many events 
//   ValidityState,save,removeone,updateone,deleteone,,intit 
//   then callback ->dont use here as it  wont gives the context of the
//    current as it is a callback in js ->that is this keyword is missing ->but context ref is most iportatnt here
//    userSchema.pre("save",async function (next){
//     if((!this.password.isModified()))return next();
//      this.password=bcrypt.hash(this.password,10);
//      next();
//    })

// what if we the user given passsword is correct or not we need to create a controlleer for this
// here the passsword is encrypted  
// but the user inputs the normal data then how do you compare them whether the user has entered the correct passwor do not  

// we create the custom methods 
// userSchema.methhods.ispasswordsCorrect=async function (password){
//   bcrypt.compare(password,this.password);
// }
// //give me the password whoever i called, this method will send the clear text passsword 
// // or i can access a password form this because just like the password has access to all its objects 
// before they store in th edb similarly methods have also access4 
// this.password->encrypted one ->cryptography ->computation power
// so takes time 
// userSchema.methhods.ispasswordsCorrect=async function (password){
//   return await bcrypt.compare(password,this.password);
// }

// jwt?
// it is a bearer token
// means that the one who bears it ,accepts it
// whoever ha sthis token ,whoever  sends it to me , i 
// will send the data to him 
// it is like a key so dont lose the key. 
// it's  quite tsrong but one has to take of tokens 
// we see this variable in .env file 
// aceess_token_secret =in production we use complex strings
// secret is strong a sit a complex. 
// aceesss _tokren_expiriy syntax
// is 1 day 
 
// refresh token? 
// refresh_toen_secret=complex-string 
// refresh token expiriy=10 days  

// we will be using both sessions and cookies ,we r going with a lot of security
// so our access token will not be stored inthe db 
// but the  refresh_token is stored inthe db ,this is how it works ,
//  copy all the tokens and even put it in saaample file .env 
//  can i make the make the method to make the access tokn in this way? like the methods we had creed earlier?  
//  which makes easy in future 

//  userSchema.addmethods.generateaccesstoken=function(){
//   //sign methd to generate the token 
//   return jwt.sign()
//   //inside sign there ll be payload,obj,buffer ,and you nneed a secret key and there is a lot of options like signing 
//   {//what information do i want you to keep 
//     _id:this_id,//this method already saved in database  and they have all the access 
//     //we et it from mongodb
//     email:this.email,
//     username:this.users,fullname:fullname
//   }
//   process.env.accesstokensecret,
//   {
//     expiresIn:process.env.acessstoken _expiriy 
//   }
//   {

//   }
//  }
//  userSchema.addmethods.generatrefreshtoken=function(){}
// both are jwt tokens 
// usage is diff 
// // ✅ User Schema & Authentication in Mongoose (FULL NOTES)

// // 👉 Export the model
// module.exports = mongoose.model("User", userSchema);

// // ❌ Direct encryption of password is not possible when saving data in MongoDB
// // ✅ Solution: Use **Mongoose middleware (hooks)**

// // ------------------------
// // 🔒 Password Encryption
// // ------------------------

// // ➤ Mongoose provides hooks like `.pre()` to run logic before certain operations
// // ➤ We want to encrypt the password just **before the data is saved**

// /*
// ✅ Available Mongoose Hook Events:
// - validate
// - save
// - remove
// - updateOne
// - deleteOne
// - init
// */

// // ❌ Don't use callbacks with hooks like pre("save")
// //    → Because `this` will lose context in a JS callback
// // ✅ Use async functions to maintain `this` (current document)

// // Encrypt password using bcrypt before saving to DB
// userSchema.pre("save", async function (next) {
//   // Only encrypt if password is newly added or modified
//   if (!this.isModified("password")) return next();

//   // Encrypt the password with salt rounds = 10
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // ----------------------------
// // 🔐 Password Verification
// // ----------------------------

// // ➤ User enters plain text password
// // ➤ We compare it with the hashed password stored in the DB

// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // 📌 Why this works?
// // - `this.password` refers to the encrypted password in DB
// // - `.methods` has access to the document's fields (just like in the hook)
// // - The method will be available on all user objects from the model

// // ⚠️ bcrypt is cryptography-based → takes CPU time (due to hashing complexity)

// // -------------------------------------
// // 🔐 JSON Web Token (JWT) Integration
// // -------------------------------------

// // 📦 JWT = Bearer Token Authentication
// // ➤ Whoever "bears" the token is assumed authenticated
// // ➤ If token is valid, user is trusted
// // ➤ Used to send/receive data securely (like a digital key)

// // 🗝 Access Token:
// // - Short-lived (e.g., 1 day)
// // - ✅ NOT stored in DB (stored in browser memory or HTTP-only cookies)

// // 🗝 Refresh Token:
// // - Longer-lived (e.g., 10 days)
// // - ✅ STORED in DB (so that it can be verified and revoked)

// // ✅ These secrets should be kept in the `.env` file

// /*
// .env file example:

// ACCESS_TOKEN_SECRET = your-access-secret-key
// ACCESS_TOKEN_EXPIRY = 1d
// REFRESH_TOKEN_SECRET = your-refresh-secret-key
// REFRESH_TOKEN_EXPIRY = 10d
// */

// // ------------------------------
// // 🧠 Custom JWT Generator Methods
// // ------------------------------

// // ➤ Creating a method to generate Access Token
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       username: this.username,
//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// // ➤ Creating a method to generate Refresh Token
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// // -------------------------
// // 📌 Summary of Key Concepts
// // -------------------------

// // 🔑 Mongoose pre-save hook → encrypt password before saving
// // 🔑 bcrypt.compare() → checks if entered password is correct
// // 🔑 Instance methods like `isPasswordCorrect()` or `generateAccessToken()` 
// //    have access to current user (`this` keyword)
// // 🔑 Access Token: short-lived, NOT stored in DB
// // 🔑 Refresh Token: longer-lived, STORED in DB for security
// // 🔑 JWT Tokens generated using jwt.sign(payload, secret, options)
// // 🔑 All secrets and expiry values should be kept secure in .env
