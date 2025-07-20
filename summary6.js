// //lecture 13
// Main Points and Steps:
// Creating and Importing Routers and Controllers:

// Use express.Router() to create a router.
// Place the router setup in a new file and export it.
// Import the router into your main app.js (or server file) and use it.
// Setting Up User Routes and Controllers:

// Define routes for actions like registration, login, etc.
// Use appropriate HTTP methods like POST and GET.
// Organize controllers to handle route logic separately.
// API Versioning:

// Design APIs with versioning, e.g., /api/v1/users.
// Create different folders for different API versions for scalability.
// Using Middleware:

// Add middleware inside your router for authentication, validation, etc.
// Make sure middleware functions are correctly applied to routes.
// Debugging and Testing:

// Debug your code carefully.
// Use Postman for testing API endpoints thoroughly.
// Handle errors gracefully with clear messages.
// Restart the server after making changes to see updates.
// Practice and Reference:

// Keep routes, controllers, and models organized and separated.
// Use proper import/export patterns.
// Use Postman for API testing with different request types.
// Use environment variables (.env files) for configuration.
// Design Pattern and Structure:

// Keep routes, controllers, and models in separate folders.
// Write clean, readable, and modular code.
// Follow industry-standard project structures for scalability.
// Final Tips:

// Commit and push code to version control regularly.
// Troubleshoot errors patiently by reading error messages.
// Implement features step-by-step, testing as you go.
// Tips:
// Name files clearly and properly export modules.
// Use API versioning and meaningful route names.
// Test all endpoints with Postman.
// Restart the server after updates.
// Carefully analyze and resolve errors for smooth development.








//Complete Guide to Router and Controller with Debugging
// Starting with the basics, the first thing he did was to create a router:

// Instead of directly writing route handlers inside your main server file (app.js), you create a separate router using express.Router(). This makes your code cleaner and more modular.
//user.controller.js
import {asynchandler} from "../utils/asynchandler.js";
const redgisteruser=asynchandler(async(req, res)=>{
    res.status(200).json({
        messege:"ok"
    })
})
// You create a new file userRoutes.js, and inside that, you write:
// const express = require('express');
// const router = express.Router();
// Define routes on this router:
// router.post('/register', userController.register);
// router.post('/login', userController.login);
// Then, export this router:
// module.exports = router;
// In your main app.js, you import and use the routes:
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/v1/users', userRoutes);
// This setup means all user-related endpoints are grouped under /api/v1/users.
// Controllers and Logic
// The controller contains the business logic. You create a separate file, like userController.js.

// Inside this controller, you define functions like register and login. For example:
// exports.register = (req, res) => {
//     // handle registration logic
// }
// The route calls this function, which gets the request data, processes it, and sends a response.
// Important: The controller isolates logic from routing, improving clarity and reusability.
// API Versioning
// To manage different versions, he recommended adding the version number in the URL:
// /api/v1/users
// For future updates, you can add /api/v2/..., making it easier to maintain backwards compatibility.

// Middleware and Validation
// Inside your router, you add middleware functions for validation or authentication before the main controller runs:
// router.post('/register', validateRegister, userController.register);
// Middleware functions look like:
// const validateRegister = (req, res, next) => {
//     // validation code
//     next(); // move to next middleware/controller
// }
// Debugging and Error Handling
// The instructor stressed the importance of proper error handling:

// Use try-catch blocks or express's error middleware.
// Send clear, specific error messages.
// He demonstrated debugging using Postman:

// Send requests to your API and check responses.
// Inspect status codes, response messages, and errors.
// If something isn't working, restart the server (node server.js or nodemon), check the logs, and read the error messages carefully.

// Organizing the Project Structure
// He kept code organized by separating routes, controllers, and models into different folders:

// bash
// /routes
// /controllers
// /models
// This clearly separates responsibilities, helping in debugging and future scaling.

// Additional Important Concepts
// Environment Variables:

// Use .env for configuration like database URLs, secret keys.
// Access them in code with process.env.
// Testing:

// Always test endpoints with Postman.
// Use different HTTP methods (GET, POST, etc.).
// Check responses thoroughly for correct data and errors.
// Summary in Practical Terms
// Create a dedicated router file using express.Router().
// Define your routes and link them to controller functions.
// Export and import routers into your main server file.
// Keep your controllers organized, separate, and clear.
// Use middleware for validation or authentication.
// Use Postman for testing all endpoints, inspecting responses, and debugging errors.
// Restart your server after every change.
// Keep your project well-structured in folders (routes, controllers, models).




//actual mechanism
// ✅ Step 1: Open Postman
// Open the Postman app

// Set method to POST

// Enter URL:

// bash
// Copy code
// http://localhost:8000/api/v1/user/register
// ✅ Step 2: Add Request Body (JSON)
// Go to the "Body" tab

// Select raw

// Choose JSON from dropdown

// Paste:

// json
// Copy code
// {
//   "username": "naveen",
//   "email": "naveen@gmail.com"
// }
// ✅ Step 3: Send the Request
// Click Send 🔁

// Postman now sends a POST request with your JSON data to your Express backend.

// ✅ Step 4: What Happens in the Backend
// 1. Middleware parses the data:
// js
// Copy code
// app.use(express.json()); // 👈 Converts raw JSON into req.body
// 2. Express matches the route:
// js
// Copy code
// app.use("/api/v1/user", userRouter);
// Inside user.routes.js:

// js
// Copy code
// router.post("/register", registerUser);
// So the full path /api/v1/user/register is matched.

// 3. Your controller runs:
// js
// Copy code
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email } = req.body;
//   console.log(username, email); // ✅ You’ll see this in terminal

//   // Respond back
//   res.status(200).json({ message: "User registered successfully" });
// });

// ✅ Step 5: You See Response in Postman
// You will see something like:

// {
//   "message": "User registered successfully"
// }
// Postman is for testing APIs by sending requests like a frontend would.

// JSON data in frontend/Postman is sent to backend through HTTP requests.

// The backend receives it using req.body (for POST/PUT).

// fetch() is how frontend communicates with backend (both send/receive).

// The method (GET, POST, etc.) defines the purpose and direction of the data.