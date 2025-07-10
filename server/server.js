import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js';

// Create express app and HTTP server
const app = express();
const server = http.createServer(app)

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Simple Route
app.use("/api/status", (req, res)=> res.send("Server is live"))

// Connect to mongodb
await connectDB();

// Define a port number where our server will run
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("Server is running on PORT:" + PORT));
