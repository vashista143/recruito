import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../lib/connectdb.js";
import User from "../lib/models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    await db.connect();

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: "user" }, JWT_SECRET, { expiresIn: "7d" });

    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      companyName: user.companyName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      saved: user.saved,
      applied: user.applied,
      resumePdfUrl: user.resumePdfUrl,
      resumeParsedText: user.resumeParsedText,
      education: user.education,
      university: user.university,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      location: user.location,
      mobile: user.mobile,
    };

    // return token; client should store it in localStorage
    return res.status(200).json({ message: "Login successful", token, user: userSafe });
  } catch (err) {
    console.error("userlogin error:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    try { await db.disconnect?.(); } catch (e) { /* ignore */ }
  }
}
