import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

// Create express app instance only here
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Middleware to strip trailing newlines and whitespace from URL
app.use((req, res, next) => {
    req.url = req.url.replace(/(%0A|%0D|\n|\r)+$/, '').replace(/\s+$/, '');
    next();
});

// Add debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Import and use routes
import userRouter from './routes/user.routes.js';

app.use("/api/v1/user", userRouter); // Good practice

// Add fallback route for debugging


export { app };
