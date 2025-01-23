import express from "express";
import cors from "cors"; // Import `cors` for handling CORS policy
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from './Routes/booksRoute.js';

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow All Origins (Not Recommended for Production)
app.use(cors());

// Option 2: Allow Specific Origins (Recommended for Security)
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed request headers
}));

// Home Route
app.get("/", (req, res) => {
    console.log(req);
    res.send("Welcome to the website");
});

// Use the Books Route
app.use('/books', booksRoute);

// MongoDB Connection and Server Initialization
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database...');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to database:", error);
    });
