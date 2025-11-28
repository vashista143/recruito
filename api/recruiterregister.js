import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Recruiter from "../lib/models/recruitor.js"; 

// MongoDB URI
const MONGODB_URI = "mongodb+srv://vashistadara03_db_user:Ds79JTR7PK6i1BaS@cluster0.zox4w78.mongodb.net/test?retryWrites=true&w=majority";

// Cache for serverless
let cachedConnection = null;
async function connectMongo() {
  if (cachedConnection) return cachedConnection;
  const conn = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  cachedConnection = conn;
  console.log("MongoDB connected");
  return conn;
}

// JWT secret
const JWT_SECRET = "supersecretkey"; // move to env in production

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await connectMongo();

    if (req.method === "POST") {
      const { name, email, password, companyName, companyWebsite, designation, department, bio, location, contactNumber } = req.body;

      if (!name || !email || !password || !companyName) {
        return res.status(400).json({ success: false, message: "Required fields missing" });
      }

      // Check if email exists
      const existing = await Recruiter.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create recruiter document
      const newRecruiter = await Recruiter.create({
        name,
        email,
        password: hashedPassword,
        companyName,
        companyWebsite,
        designation,
        department,
        bio,
        location,
        contactNumber
      });

      // Generate JWT
      const token = jwt.sign({ id: newRecruiter._id, role: "recruiter" }, JWT_SECRET, { expiresIn: "7d" });

      return res.status(201).json({
        success: true,
        token,
        recruiter: {
          id: newRecruiter._id,
          name: newRecruiter.name,
          email: newRecruiter.email,
          companyName: newRecruiter.companyName,
          companyWebsite: newRecruiter.companyWebsite,
          designation: newRecruiter.designation,
          department: newRecruiter.department
        }
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
