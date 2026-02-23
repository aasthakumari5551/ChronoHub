import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// 🔹 Google Auth (sign-in or sign-up with role)
export const googleAuth = async (req, res) => {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      return res.status(503).json({ message: "Google Sign-In is not configured. Add GOOGLE_CLIENT_ID to the server." });
    }

    const { idToken, role } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;
    const safeName = name || email?.split("@")[0] || "User";

    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save({ validateBeforeSave: false });
      }
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    // New user: role required for sign-up
    const safeRole = role && ALLOWED_SIGNUP_ROLES.includes(role) ? role : "employee";
    user = await User.create({
      name: safeName,
      email,
      googleId,
      role: safeRole,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Google auth error:", error?.message);
    res.status(401).json({ message: "Invalid Google token or sign-up required" });
  }
};

// 🔹 Register User (only employee and manager can sign up; admin is assigned by existing admins)
const ALLOWED_SIGNUP_ROLES = ["employee", "manager"];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Signup restricted to employee and manager only
    const safeRole = role && ALLOWED_SIGNUP_ROLES.includes(role) ? role : "employee";

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: safeRole,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// 🔹 Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};