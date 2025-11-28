import jwt from "jsonwebtoken";
import db from "../lib/connectdb.js";
import Recruiter from "../lib/models/recruitor.js";
import User from "../lib/models/user.js";

const JWT_SECRET = "supersecretkey";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "No token" });

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await db.connect();

    let userData = null;

    if (decoded.role === "recruiter") {
      userData = await Recruiter.findById(decoded.id).select("-password");
    } else {
      userData = await User.findById(decoded.id).select("-password");
    }

    if (!userData)
      return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      role: decoded.role,
      [decoded.role]: userData
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
