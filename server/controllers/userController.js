import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// controllers for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Await bcrypt.hash()
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);
    newUser.password = undefined; // Hide password in response

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// controllers for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Respond with success message
    const token = generateToken(user._id);
    user.password = undefined; // Hide password in response
    res
      .status(200)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//controller for getting user profile by ID
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getting user by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// controller for getting user resumes

//Get: /api/users/resumes

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // return user resume

    const resumes = await Resume.find({ userId: userId });
    // console.log(resumes);
    return res.status(200).json({ resumes });
  } catch (error) {
    console.error("Error in getting user resumes:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
