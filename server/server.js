import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";

// routes imports
import userRoutes from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
await connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the AI Resume Builder API");
});

app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
