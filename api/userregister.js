import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../lib/connectdb.js";
import User from "../lib/models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const SALT_ROUNDS = 10;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password, companyName } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    await db.connect();

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      name: (name || "").trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      companyName: (companyName || "").trim(),
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: "user" }, JWT_SECRET, { expiresIn: "7d" });

    const userSafe = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      companyName: newUser.companyName,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({ message: "User registered", token, user: userSafe });
  } catch (err) {
    console.error("userregister error:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    try { await db.disconnect?.(); } catch (e) { /* ignore */ }
  }
}
