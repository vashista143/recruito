import db from "../lib/connectdb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Recruiter from "../lib/models/recruitor.js"; // make sure filename matches
// JWT secret
const JWT_SECRET = "supersecretkey"; // move to env in production

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // use shared connection helper which caches connections across modules
    await db.connect();

    if (req.method === "POST") {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }

      // Find recruiter by email and include password field
      const recruiter = await Recruiter.findOne({ email }).select("+password");
      if (!recruiter) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, recruiter.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      // Generate access token (short-lived) and refresh token (httpOnly cookie)
      const accessToken = jwt.sign(
        { id: recruiter._id, role: "recruiter" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const refreshToken = jwt.sign(
        { id: recruiter._id, email: recruiter.email, type: 'refresh' },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Set refresh token as httpOnly cookie
      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`);

      // Return data without password
      return res.status(200).json({
        success: true,
        token: accessToken,
        recruiter: {
          _id: recruiter._id,
          name: recruiter.name,
          email: recruiter.email,
          companyName: recruiter.companyName,
          companyWebsite: recruiter.companyWebsite,
          designation: recruiter.designation,
          department: recruiter.department
        }
      });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    console.error("Recruiter login error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
